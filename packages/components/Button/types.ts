
import type { Component, ComputedRef, Ref } from 'vue';

// 定义按钮类型
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
// 定义原生按钮类型
export type NativeType = 'button' | 'reset' | 'submit';
// 定义按钮大小
export type ButtonSize = 'large' | 'default' | 'small';

// 按钮组件的属性类型定义
export interface ButtonProps {
    // 按钮的标签，可以是一个字符串或者 Vue 组件
    tag?: string | Component;
    // 按钮的类型，可以是 'primary', 'success', 'warning', 'danger', 'info' 之一
    type?: ButtonType;
    // 按钮的大小，可以是 'large', 'default', 'small' 之一
    size?: ButtonSize;
    // 原生按钮的类型，可以是 'button', 'reset', 'submit' 之一
    nativeType?: NativeType;
    // 按钮是否禁用
    disabled?: boolean;
    // 按钮是否处于加载中状态
    loading?: boolean;
    // 按钮的图标
    icon?: string;
    // 是否为圆形按钮
    circle?: boolean;
    // 是否为朴素按钮
    plain?: boolean;
    // 是否为圆角按钮
    round?: boolean;
    // 加载状态下的图标
    loadingIcon?: string;
    // 是否自动聚焦
    autofocus?: boolean;
    // 是否使用节流
    useThrottle?: boolean;
    // 节流持续时间
    throttleDuration?: number;
}

// 按钮组的属性类型定义
export interface ButtonGroupProps {
    // 按钮组的大小，可以是 'large', 'default', 'small' 之一
    size?: ButtonSize;
    // 按钮组的类型，可以是 'primary', 'success', 'warning', 'danger', 'info' 之一
    type?: ButtonType;
    // 按钮组是否禁用
    disabled?: boolean;
}

// 按钮组上下文的定义
// 用于提供给按钮组内的按钮组件的上下文
export interface ButtonGroupContext {
    // 按钮组的大小，可以是 'large', 'default', 'small' 之一
    size?: ButtonSize;
    // 按钮组的类型，可以是 'primary', 'success', 'warning', 'danger', 'info' 之一
    type?: ButtonType;
    // 按钮组是否禁用
    disabled?: boolean;
}


// 接口 ButtonEmits 定义了一个事件处理函数的签名，该函数接收一个事件名称 'click'
// 和一个 MouseEvent 对象作为参数，并且没有返回值。
// 定义按钮组件的事件处理类型
// 处理 'click' 事件
export interface ButtonEmits {
    // 事件处理函数签名，接收一个事件名称 'click' 和一个 MouseEvent 对象
    (e: 'click', val: MouseEvent): void;
}

// 然后就是 button 组件暴露的实例
// 首先就是 button HTML 结点用 ref
// ButtonInstance 接口用于表示按钮组件暴露的实例，其包含一个 ref 属性
// 指向一个 HTMLButtonElement 或 void   
// 定义按钮组件暴露的实例类型
export interface ButtonInstance {
    // 按钮组件的 ref，指向一个 HTMLButtonElement 或 void（可能还没有挂载）
    ref: Ref<HTMLButtonElement | void>;
    // 计算得到的按钮禁用状态
    disabled: ComputedRef<boolean>;
    // 计算得到的按钮大小
    size: ComputedRef<ButtonSize | "">;
    // 计算得到的按钮类型
    type: ComputedRef<ButtonType | "">;
}
