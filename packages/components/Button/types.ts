// 定义类型文件

import type { Component, ComputedRef, Ref } from 'vue';

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type NativeType = 'button' | 'reset' | 'submit';
export type ButtonSize = 'large' | 'default' | 'small';

// 按钮参数类型   按钮组件的属性
export interface ButtonProps {
    tag?: string | Component;
    type?: ButtonType;
    size?: ButtonSize;
    nativeType?: NativeType;
    disabled?: boolean;
    loading?: boolean;
    icon?: string;
    circle?: boolean;
    plain?: boolean;
    round?: boolean;
    loadingIcon?: string;
    autofocus?: boolean;
    useThrottle?: boolean;
    throttleDuration?: number;
}

// 按钮组类型
export interface ButtonGroupProps {
    size?: ButtonSize;
    type?: ButtonType;
    disabled?: boolean;
}
// 对上下文的定义
export interface ButtonGroupContext {
    size?: ButtonSize;
    type?: ButtonType;
    disabled?: boolean;
}

// 接口 ButtonEmits 定义了一个事件处理函数的签名，该函数接收一个事件名称 'click' 
// 和一个 MouseEvent 对象作为参数，并且没有返回值。
export interface ButtonEmits {
    (e: 'click', val: MouseEvent): void;
}

// 然后就是 button 组件暴露的实例
// 首先就是 button HTML 结点用 ref
// ButtonInstance 接口用于表示按钮组件暴露的实例，其包含一个 ref 属性
// 指向一个 HTMLButtonElement 或 void。
export interface ButtonInstance {
    ref: Ref<HTMLButtonElement | void>
    disabled: ComputedRef<boolean>
    size: ComputedRef<ButtonSize | "">
    type: ComputedRef<ButtonType | "">
}