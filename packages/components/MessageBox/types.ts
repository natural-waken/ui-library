import { type Ref, type VNode } from "vue";
import { type MessageType } from "../Message/types";
import { type ButtonType } from "../Button/types";

// 消息框的三种可能的动作："confirm"（确认），"cancel"（取消），"close"（关闭）
export type MessageBoxAction = "confirm" | "cancel" | "close";
// 消息框的四种类型："prompt"（提示），"alert"（警告），"confirm"（确认）和空字符串
export type MessageBoxType = "" | "prompt" | "alert" | "confirm";
// 消息框的动作被触发时调用
export type MessageBoxCallback = (
    action: MessageBoxAction | { value: string; action: MessageBoxAction }
) => void;

export type MessageBoxInputData = {
    value: string;
    action: MessageBoxAction;
};
export type MessageBoxData = MessageBoxInputData & MessageBoxAction;

// 配置消息框的各种选项
export interface MessageBoxOptions {
    title?: string;
    message?: string | VNode | (() => VNode);  // 消息内容，可以是字符串、VNode或返回VNode的函数
    type?: MessageType;  // 消息类型
    boxType?: MessageBoxType;  // 消息框类型
    icon?: string;  // 消息框图标
    callback?: MessageBoxCallback;
    showClose?: boolean;  // 是否显示关闭按钮
    showInput?: boolean; // 是否显示输入框
    showCancelButton?: boolean;
    showConfirmButton?: boolean;  // 是否显示取消和确认按钮
    cancelButtonText?: string;
    confirmButtonText?: string;  // 取消和确认按钮的文本
    cancelButtonLoading?: boolean;
    confirmButtonLoading?: boolean;
    cancelButtonDisabled?: boolean;
    confirmButtonDisabled?: boolean;  // 取消和确认按钮的禁用状态

    cancelButtonType?: ButtonType;  // 按钮类型
    confirmButtonType?: ButtonType;
    roundButton?: boolean;  // 是否使用圆形按钮

    center?: boolean;  // 是否居中显示
    lockScroll?: boolean;  // 是否锁定滚动
    closeOnClickModal?: boolean;  // 点击模态框外部是否关闭

    inputPlaceholder?: string;  // 输入框的占位符
    inputValue?: string;  // 输入框的值
    inputType?: "text" | "textarea" | "password" | "number";  // 输入框的类型（文本、文本区域、密码、数字）

    buttonSize?: "default" | "small" | "large";
    beforeClose?: (
        action: MessageBoxAction,
        instance: MessageBoxOptions,
        done: () => void
    ) => void;
}

export interface MessageBoxProps extends MessageBoxOptions {
    visible?: Ref<boolean>;  // 一个引用类型，用于控制消息框的显示状态
    doClose(): void;  // 关闭消息框
    doAction(action: MessageBoxAction, inputVal?: string): void;  // 执行动作的方法
    destroy(): void;  // 销毁消息框
}

// 定义了一种函数类型，该函数接受不同的参数组合并返回一个 Promise，当用户执行某个动作时，Promise 解析为 MessageBoxData
export type MessageBoxShortcutMethod = ((
    message: MessageBoxOptions["message"],
    title: MessageBoxOptions["title"],
    options?: MessageBoxOptions
) => Promise<MessageBoxData>) &
    ((
        message: MessageBoxOptions["message"],
        options?: MessageBoxOptions
    ) => Promise<MessageBoxData>);

// 消息框实例
export interface IErMessageBox {
    (options: MessageBoxOptions | string | VNode): Promise<any>;

    // 三种快捷方法，使用MessageBoxShortcutMethod类型
    alert: MessageBoxShortcutMethod;
    confirm: MessageBoxShortcutMethod;
    prompt: MessageBoxShortcutMethod;
    close(): void;  // 关闭消息框
}