import { shallowReactive, isVNode, render, h } from "vue";
import type {
    CreateNotificationProps,
    Notification,
    NotificationFn,
    NotificationHandler,
    NotificationInstance,
    NotificationParams,
    NotificationProps,
    NotificationType,
} from "./types";

import { notificationTypes, notificationPosition } from "./types";
import { useId, useZIndex } from "@ui-library/hooks";
import { isString, findIndex, set, each, get } from "lodash-es";
import NotificationConstructor from "./Notification.vue";

// Map 对象，用于存储不同位置的通知实例数组
// Map 的键是 NotificationProps["position"] 类型（即通知的位置），值是 NotificationInstance 数组
const instancesMap: Map<NotificationProps["position"], NotificationInstance[]> =
    new Map();

// 遍历 notificationPosition 数组中的每个位置
// 对于每个位置，instancesMap 使用 set 方法将该位置与一个空的反应式数组（shallowReactive([])）关联。
// shallowReactive 是 Vue 的一个工具，用于创建浅层反应式对象
each(notificationPosition, (position) => {
    instancesMap.set(position, shallowReactive([]));
});

// 用于获取下一个 zIndex 值，以确保新创建的通知不会被已有的通知遮挡
// 确保新通知显示在正确的堆叠顺序中
const { nextZIndex } = useZIndex();

// 通知的默认配置
export const notificationDefaults = {
    type: "info",
    duration: 3000,
    offset: 20,
    transitionName: "fade",
    showClose: true,
} as const;


// 将输入的通知消息参数标准化为 CreateNotificationProps 类型
// 接受一个参数 opts，类型为 NotificationParams。返回值类型为 CreateNotificationProps
// 如果 opts 为空、虚拟节点或字符串，则将其包装成一个包含 message 属性的对象   其值为 opts
// 否则，直接将 opts 赋值给 result
const normalizedOptions = (
    opts: NotificationParams
): CreateNotificationProps => {
    const result =
        !opts || isVNode(opts) || isString(opts) ? { message: opts } : opts;
    // 合并成一个新的对象   返回值被断言为 CreateNotificationProps 类型
    return { ...notificationDefaults, ...result } as CreateNotificationProps;
};

// 用于根据通知的位置从 instancesMap 中获取通知实例数组
// 接受参数为 表示通知的位置。这个位置可以是之前定义的四种之一："top-right", "top-left", "bottom-right", "bottom-left"
// 该函数返回一个 NotificationInstance 数组  
// 从 instancesMap 中获取对应 position 的通知实例数组
const getInstancesByPosition = (
    position: NotificationProps["position"]
): NotificationInstance[] => instancesMap.get(position)!;

// 函数作用是  创建一个通知实例，生成唯一 ID，创建并渲染通知组件的虚拟节点，添加到 DOM 中，并提供关闭消息的方法。
// 创建一个通知实例   接受参数 props  返回一个通知实例
const createNotification = (
    props: CreateNotificationProps
): NotificationInstance => {
    const id = useId().value;
    const container = document.createElement("div");
    const instances = getInstancesByPosition(props.position || "top-right");  // 要是没传方向默认是 top-right

    // 销毁通知实例的方法
    const destory = () => {
        const idx = findIndex(instances, { id });
        if (idx === -1) return;

        instances.splice(idx, 1);
        render(null, container);
    };

    // 创建个内部 props   包括外部 props  和内部方法等等
    const _props: NotificationProps = {
        ...props,
        id,
        zIndex: nextZIndex(),
        onDestory: destory,
    };
    const vnode = h(NotificationConstructor, _props);  // 创建通知组件的虚拟节点

    render(vnode, container);
    document.body.appendChild(container.firstElementChild!);

    // 创建处理器
    const vm = vnode.component!;
    const handler: NotificationHandler = {
        close: () => vm.exposed!.close(),
    };
    // 通知实例对象
    const instance: NotificationInstance = {
        props: _props,
        id,
        vm,
        vnode,
        handler,
    };
    instances.push(instance);
    return instance;
};

// 创建并返回一个通知处理器
// NotificationFn 是一个函数类型，定义了创建通知和关闭所有通知的方法。
// Partial<Notification> 表示 Notification 类型的部分实现，即可以只实现 Notification 接口中的部分属性或方法
export const notification: NotificationFn & Partial<Notification> = function (
    options = {}
) {
    const normalized = normalizedOptions(options);  // 将传入的 options 参数标准化
    const instance = createNotification(normalized);  // 创建一个通知实例

    return instance.handler;
};

// 用于关闭所有通知   type 用于指定要关闭的消息类型  type 可选   要是不传就是把所有的都关闭
export function closeAll(type?: NotificationType) {
    // 要 forEach  和之前 message 不同   相当于是从一个消息队列变成了四个队列
    instancesMap.forEach((instances) => {
        each(instances, (instance) => {
            if (type) {
                instance.props.type === type && instance.handler.close();
                return;
            }
            instance.handler.close();
        });
    });
}

// 获取最后一个通知的底部偏移量
export function getLastBottomOffset(this: NotificationProps) {
    const instances = getInstancesByPosition(this.position || "top-right");
    const idx = findIndex(instances, { id: this.id });

    if (idx <= 0) return 0;

    return get(instances, [idx - 1, "vm", "exposed", "bottomOffset", "value"]);
}

// 为每种通知类型创建一个相应的通知函数，并将其设置为 notification 对象的属性
each(notificationTypes, (type) => {
    set(notification, type, (opts: NotificationParams) => {  // 对于每种类型 type，执行内部的箭头函数
        const normalized = normalizedOptions(opts);
        return notification({ ...normalized, type });
    });
});

// 将 closeAll 方法添加到 notification 对象上，使 notification.closeAll 可以被调用来关闭所有消息。
notification.closeAll = closeAll;
export default notification as Notification;
