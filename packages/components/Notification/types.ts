import type { VNode, Ref, ComponentInternalInstance } from "vue";

// 包含通知类型的字符串数组
export const notificationTypes = [
    "info",
    "success",
    "warning",
    "danger",
] as const;
// 定义为联合类型 NotificationType，即 info、success、warning 和 danger 四种类型之一
export type NotificationType = (typeof notificationTypes)[number];

// 通知显示位置
export const notificationPosition = [
    "top-right",
    "top-left",
    "bottom-right",
    "bottom-left",
] as const;
export type NotificationPosition = (typeof notificationPosition)[number];  // 联合类型，只能是 top-right, top-left, bottom-right, bottom-left 其中之一

// 定义了通知组件的属性
export interface NotificationProps {
    title: string;
    id: string;
    zIndex: number;
    position: NotificationPosition;  // 显示四个方向
    type?: "success" | "info" | "warning" | "danger" | "error";
    message?: string | VNode;  // 内容
    duration?: number;  // 显示时长
    showClose?: boolean;  // 是否显示关闭按钮
    offset?: number;  // 垂直偏移量
    transitionName?: string;  // 过渡动画名称
    icon?: string;  // 图标显示
    onClick?(): void;
    onClose?(): void;
    onDestory(): void;
}

// 描述一个通知实例
export interface NotificationInstance {
    id: string;
    vnode: VNode;  // 虚拟节点
    vm: ComponentInternalInstance;  // 组件实例
    props: NotificationProps;  // 属性
    handler: NotificationHandler;  // 处理器
}
// 描述通知组件实例
export interface NotificationCompInstance {
    close(): void;
    bottomOffset: Ref<number>;
}

// 表示创建通知时的属性，去掉了 NotificationProps 中的 onDestory、id 和 zIndex 属性
export type CreateNotificationProps = Omit<
    NotificationProps,
    "onDestory" | "id" | "zIndex"
>;
// 处理器类型
export interface NotificationHandler {
    close(): void;
}

export type NotificationOptions = Partial<Omit<NotificationProps, "id">>;
export type NotificationParams = string | VNode | NotificationOptions;  // 表示通知参数，可以是字符串、虚拟节点或通知选项

// 表示一个通知函数，它接受 NotificationParams 类型的参数并返回 NotificationHandler
export type NotificationFn = {
    (props: NotificationParams): NotificationHandler;
    closeAll(type?: NotificationType): void;
};
// 表示一个通知类型函数，它接受 NotificationParams 类型的参数并返回 NotificationHandler
export type NotificationTypeFn = (
    props: NotificationParams
) => NotificationHandler;

export interface Notification extends NotificationFn {
    success: NotificationTypeFn;
    warning: NotificationTypeFn;
    info: NotificationTypeFn;
    danger: NotificationTypeFn;
}