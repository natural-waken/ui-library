import { isVNode, render, shallowReactive, h } from "vue";  // 用于操作虚拟节点和响应式数据
import type {
    CreateMessageProps,
    MessageInstance,
    MessageFn,
    Message,
    MessageParams,
    MessageProps,
    MessageHandler,
    MessageType,
} from "./types";
import { messageTypes } from "./types";
import { useId, useZIndex } from "@ui-library/hooks";
import { isString, findIndex, set, each, get } from "lodash-es";
import MessageConstructor from "./Message.vue";

const instances: MessageInstance[] = shallowReactive([]);  // 存储当前所有的消息实例
const { nextZIndex } = useZIndex(); // 获取下一个 z-index 值
// 消息的默认配置
export const messageDefaults = {
    type: "info",
    duration: 3000,
    offset: 10,
    transitionName: "fade-up",
};

// 将输入的消息参数标准化为 CreateMessageProps 类型
// 接受一个参数 opts，类型为 MessageParams。返回值类型为 CreateMessageProps
// 如果 opts 为空、虚拟节点或字符串，则将其包装成一个包含 message 属性的对象   其值为 opts
// 否则，直接将 opts 赋值给 result
const normalizedOptions = (opts: MessageParams): CreateMessageProps => {
    const result =
        !opts || isVNode(opts) || isString(opts)
            ? {
                message: opts,
            }
            : opts;
    // 合并成一个新的对象   返回值被断言为 CreateMessageProps 类型
    return { ...messageDefaults, ...result } as CreateMessageProps;
};

// 这个就是关键
// 函数作用是  创建一个消息实例，生成唯一 ID，创建并渲染消息组件的虚拟节点，添加到 DOM 中，并提供关闭消息的方法。
// 创建一个消息实例   接受参数 props  返回一个消息实例
const createMessage = (props: CreateMessageProps): MessageInstance => {
    const id = useId().value;  // 生成一个唯一的 ID   用于标识每个消息实例
    const container = document.createElement("div");  // 作为消息组件的容器

    // 销毁消息实例的方法
    const destory = () => {
        // 从全局 instances 数组中找到当前消息实例的索引 idx
        const idx = findIndex(instances, { id });
        if (idx === -1) return;

        // 移除该实例，并将 container 的内容渲染为空
        instances.splice(idx, 1);
        render(null, container);
    };

    // 创建个内部 props   包括外部 props  和内部方法等等
    // 合并消息参数、ID 和 z-index 以及销毁函数
    const _props: MessageProps = {
        ...props,
        id,
        zIndex: nextZIndex(),
        onDestory: destory,
    };
    const vnode = h(MessageConstructor, _props);  // 创建消息组件的虚拟节点   另一种方式  createVNode
    // const vnode = createVNode(MessageConstructor, { props: _props });  // 创建消息组件的虚拟节点
    render(vnode, container);  // 渲染虚拟节点到容器中
    document.body.appendChild(container.firstElementChild!);  // 将消息节点添加到 DOM 中   就是 container 不加进去  而是 vnode 进入 body

    // 创建消息处理器
    // 获取虚拟节点的组件实例 vm
    // 创建一个消息处理器对象 handler，提供一个 close 方法，用于关闭消息。这是通过调用组件实例 vm 上的 exposed 属性中的 close 方法实现的
    const vm = vnode.component!;
    const handler: MessageHandler = {
        close: () => vm.exposed!.close(),
    };
    // 消息实例对象，包含属性、ID、虚拟节点和处理器
    const instance: MessageInstance = {
        props: _props,
        id,
        vm,
        vnode,  // 消息组件的虚拟节点 vnode
        handler,
    };
    instances.push(instance);  // 将消息实例添加到全局实例数组中

    return instance;
};

// 获取最后一个消息的底部偏移量
export function getLastBottomOffset(this: MessageProps) {
    const idx = findIndex(instances, { id: this.id });
    if (idx <= 0) return 0;  // 即当前实例是第一个实例或没有找到   就像第一个在最顶部  不用计算

    // 当前消息实例之前的最后一个消息实例的底部偏移量
    // 返回前一个消息实例的 bottomOffset 值。使用 get 函数安全地获取嵌套属性
    // bottomOffset  是在 hooks 里面声明的   是通过计算而出来的
    // instances[idx - 1].vm.exposed.bottomOffset.value
    return get(instances, [idx - 1, "vm", "exposed", "bottomOffset", "value"]);
}

// 这是一个函数，创建并显示一个消息。表示该函数具有 MessageFn 和部分 Message 的类型。
export const message: MessageFn & Partial<Message> = (options = {}) => {
    const normalized = normalizedOptions(options);  // 将传入的 options 参数标准化为 CreateMessageProps 类型。
    const instance = createMessage(normalized);  // 创建消息实例

    return instance.handler;  // 返回消息处理器 handler，它提供关闭消息的方法。
};

// 用于关闭所有消息   type 用于指定要关闭的消息类型  type 可选   要是不传就是把所有的都关闭
export function closeAll(type?: MessageType) {
    // 使用 each 函数遍历全局 instances 数组中的所有消息实例。
    // 如果 type 参数存在，且当前实例的类型与 type 匹配，则调用 instance.handler.close() 关闭该实例。
    // 如果 type 参数不存在，直接调用 instance.handler.close() 关闭所有实例
    each(instances, (instance) => {
        if (type) {
            instance.props.type === type && instance.handler.close();
            return;
        }
        instance.handler.close();
    });
}

// 遍历 messageTypes 数组中的每个消息类型
// messageTypes 是一个包含所有消息类型（如 "info", "success", "warning", "danger", "error"）的常量数组
// 遍历 messageTypes 数组，为每种消息类型（如 "info", "success" 等）在 message 对象上创建一个特定的函数。
// 每个函数接受消息参数，标准化这些参数，并创建对应类型的消息。
each(messageTypes, (type) => {
    // 使用 set 函数将一个新的函数添加到 message 对象中，键是消息类型（如 "info", "success" 等），值是一个函数。
    set(message, type, (opts: MessageParams) => {
        const normalized = normalizedOptions(opts);
        return message({ ...normalized, type });  // 它调用 message 函数，传入标准化的选项和当前消息类型 type，创建并显示消息
    });
    // 最终返回的是消息处理器
});

// 将 closeAll 方法添加到 message 对象上，使 message.closeAll 可以被调用来关闭所有消息。
message.closeAll = closeAll;

export default message as Message;
// 后面我们使用的话  就是 message.success