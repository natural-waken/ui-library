import type { Ref, VNode, ComponentInternalInstance } from "vue";

// 包含消息类型的字符串数组
export const messageTypes = [
    "info",
    "success",
    "warning",
    "danger",
    "error",
] as const;
export type MessageType = (typeof messageTypes)[number];

// close 方法，用于关闭消息
export interface MessageHandler {
    close(): void;
}

export type MessageFn = {
    (props: MessageParams): MessageHandler;
    closeAll(type?: MessageType): void;
};

// MessageTypeFn 类型定义了一个函数签名，接受 MessageParams 类型的参数，返回 MessageHandler
export type MessageTypeFn = (props: MessageParams) => MessageHandler;

export interface Message extends MessageFn {
    success: MessageTypeFn;
    warning: MessageTypeFn;
    info: MessageTypeFn;
    danger: MessageTypeFn;
    error: MessageTypeFn;
}

// 定义了消息组件的属性
export interface MessageProps {
    id: string;
    message?: string | VNode | (() => VNode);
    duration?: number;  // 消息显示时长（可选）
    showClose?: boolean;  // 是否显示关闭按钮（可选）
    center?: boolean;  // 消息是否居中显示（可选）
    type?: MessageType;  // 消息类型
    offset?: number;  // 消息的垂直偏移量（可选）
    zIndex: number;
    transitionName?: string;  // 消息的过渡动画名称（可选）
    onDestory(): void;  // 消息销毁时的回调函数
}

export type MessageOptions = Partial<Omit<MessageProps, "id">>;
export type MessageParams = string | VNode | MessageOptions;

export interface MessageInstance {
    id: string;
    vnode: VNode;
    props: MessageProps;
    vm: ComponentInternalInstance;
    handler: MessageHandler;
}

// 消息实例的结构
export interface MessageCompInstance {
    close(): void;
    bottomOffset: Ref<number>;
}

export type CreateMessageProps = Omit<
    MessageProps,
    "onDestory" | "id" | "zIndex"
>;