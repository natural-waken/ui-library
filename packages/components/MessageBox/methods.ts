import type {
    MessageBoxAction,
    MessageBoxOptions,
    MessageBoxData,
    MessageBoxCallback,
    MessageBoxProps,
    IErMessageBox,
} from "./types";
import type { ComponentPublicInstance, VNode, VNodeProps, Ref } from "vue";
import { createVNode, isVNode, ref, render, nextTick } from "vue";
import {
    isString,
    isFunction,
    each,
    set,
    isObject,
    isUndefined,
    assign,
} from "lodash-es";

import MessageBoxConstructor from "./MessageBox.vue";

// 存储消息框实例及其相关的回调函数、解决和拒绝 Promise 的函数
const messageInstanceMap = new Map<
    ComponentPublicInstance<{ doClose: () => void }>,
    {
        options: MessageBoxOptions;
        callback: MessageBoxCallback | void;
        resolve: (res: any) => void;
        reject: (res: any) => void;
    }
>();

// 初始化消息框实例
function initInstance(props: MessageBoxProps, container: HTMLElement) {
    const visible = ref(false);  // 控制消息框的显示状态
    const isVNodeMsg = isFunction(props?.message) || isVNode(props?.message);  // 是否是函数或 VNode

    const genDefaultSlot = (msg: VNode | (() => VNode)) =>
        isFunction(msg) ? msg : () => msg;

    // 使用 createVNode 创建 VNode，并将其渲染到传入的 container 中
    const vnode = createVNode(
        MessageBoxConstructor,
        {
            ...props,
            visible,
        } as VNodeProps,
        isVNodeMsg ? { default: genDefaultSlot(props.message as VNode) } : void 0
    );

    render(vnode, container);
    document.body.appendChild(container.firstElementChild!);
    return vnode.component;  // 返回消息框组件实例
}

// 创建消息框实例
function createMessage(options: MessageBoxOptions) {
    // 创建一个新的 div 元素作为消息框的容器
    const container = document.createElement("div");

    // 定义消息框的属性对象
    const props: MessageBoxProps = {
        ...options, // 展开传入的 options 对象
        doClose: () => {
            vm.visible.value = false; // 设置消息框的可见性为 false，从而关闭消息框
        },
        doAction: (action: MessageBoxAction, inputVal: string) => {
            // 从 messageInstanceMap 中获取当前消息框实例对应的消息数据
            const currentMsg = messageInstanceMap.get(vm);
            let resolve:
                | MessageBoxAction
                | { value: string; action: MessageBoxAction };

            // 在下一个 DOM 更新周期关闭消息框
            nextTick(() => vm.doClose());

            // 根据是否显示输入框来设置 resolve 的值
            if (options.showInput) {
                resolve = { value: inputVal, action };
            } else {
                resolve = action;
            }

            // 如果存在回调函数，则调用回调函数并传递 resolve 的值
            if (options.callback) {
                options.callback(resolve);
                return;
            }

            // 根据操作类型来决定调用 reject 还是 resolve
            if (action === "cancel" || action === "close") {
                currentMsg?.reject(action); // 拒绝操作并传递 action
                return;
            }
            currentMsg?.resolve(resolve); // 解析操作并传递 resolve 的值
        },
        destroy: () => {
            render(null, container); // 销毁消息框实例
            messageInstanceMap.delete(vm); // 从 messageInstanceMap 中删除消息框实例
        },
    };

    // 初始化消息框实例
    const instance = initInstance(props as MessageBoxProps, container);

    // 获取消息框实例的代理对象
    const vm = instance?.proxy as ComponentPublicInstance<{
        doClose: () => void;
        visible: Ref<boolean>;
    }>;

    // 设置消息框的可见性为 true，从而显示消息框
    vm.visible.value = true;

    // 返回消息框实例的代理对象
    return vm;
}


// MessageBox 函数实现了一个灵活的消息框生成机制，支持传入不同类型的参数，并返回一个 Promise，
// 以便调用者能够使用 async / await 或.then() 方法来处理消息框的结果
async function MessageBox(options: MessageBoxOptions): Promise<MessageBoxData>;
// 可以接收三种类型的参数：MessageBoxOptions、string 或 VNode。这个函数返回一个 Promise，其解析值的类型是 any
function MessageBox(options: MessageBoxOptions | string | VNode): Promise<any> {
    let callback: MessageBoxCallback | void;  // 存储传入的回调函数
    // 如果 options 是字符串或 VNode，将其转换为一个包含 message 属性的对象。
    // 否则，提取 options 中的 callback 属性
    if (isString(options) || isVNode(options)) {
        options = {
            message: options,
        };
    } else {
        callback = options.callback;
    }
    return new Promise((resolve, reject) => {
        // 调用 createMessage 函数，传入 options 参数，创建消息框实例
        const instance = createMessage(options);
        // 将创建的消息框实例及其相关的回调函数、resolve 和 reject 函数存储在 messageInstanceMap 中，映射的键是消息框实例
        messageInstanceMap.set(instance, { options, callback, resolve, reject });
    });
}

const MESSAGE_BOX_VARIANTS = ["alert", "confirm", "prompt"] as const;
// Record<K, T> 用于创建一个键类型为 K，值类型为 T 的对象
// Partial<MessageBoxOptions> 表示 MessageBoxOptions 类型的所有属性都是可选的。
const MESSAGE_BOX_DEFAULT_OPTS: Record<
    (typeof MESSAGE_BOX_VARIANTS)[number],
    Partial<MessageBoxOptions>
> = {
    alert: { closeOnClickModal: false },
    confirm: { showCancelButton: true },
    prompt: { showCancelButton: true, showInput: true },
};

// each 函数迭代 MESSAGE_BOX_VARIANTS 数组，
// 对于每种变体调用一次 messageBoxFactory 函数，并将生成的函数设置到 MessageBox 对象上
each(MESSAGE_BOX_VARIANTS, (type) =>
    set(MessageBox, type, messageBoxFactory(type))
);

// 用于创建消息框类型的实例
function messageBoxFactory(boxType: (typeof MESSAGE_BOX_VARIANTS)[number]) {
    return (
        message: string | VNode,
        title: string | MessageBoxOptions,
        options: MessageBoxOptions
    ) => {
        let titleOrOpts = "";
        if (isObject(title)) {
            options = title as MessageBoxOptions;
            titleOrOpts = "";
        } else if (isUndefined(title)) {
            titleOrOpts = "";
        } else {
            titleOrOpts = title as string;
        }

        return MessageBox(
            assign(
                {
                    title: titleOrOpts,
                    message,
                    type: "",
                    boxType,
                    ...MESSAGE_BOX_DEFAULT_OPTS[boxType],
                },
                options
            )
        );
    };
}

// 关闭所有的消息框实例，并清空 messageInstanceMap
set(MessageBox, "close", () => {
    messageInstanceMap.forEach((_, vm) => {
        vm.doClose();
    });
    messageInstanceMap.clear();
});

export default MessageBox as IErMessageBox;