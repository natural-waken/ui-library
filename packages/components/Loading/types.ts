import type { MaybeRef } from "vue";

// 这个是调用 loading 实例时候用到的类型
export interface LoadingOptionsResolved {
    parent?: HTMLElement;  // 表示加载组件的父元素
    target?: HTMLElement;  // 表示加载组件的目标元素
    visible?: MaybeRef<boolean>;  // 表示加载组件是否可见，可以是一个布尔值或一个 ref 对象
    background?: MaybeRef<string>;  // 表示加载组件的背景颜色，可以是一个字符串或一个 ref 对象
    spinner?: MaybeRef<boolean | string>;  // 表示是否显示加载动画或自定义加载动画的 HTML     这个就是加载的那个雪花图标
    text?: MaybeRef<string>;  // 表示加载组件中显示的文本
    fullscreen?: MaybeRef<boolean>;  // 表示加载组件是否全屏显示
    // 如果这个 fullscreen 为 true    就等价于函数调用
    lock?: MaybeRef<boolean>;  // 表示是否锁定屏幕滚动
    beforeClose?(): boolean;  // 在加载组件关闭前调用的钩子函数
    closed?(): void;  // 在加载组件关闭后调用的钩子函数
}

// 从 LoadingOptionsResolved 类型中省略 parent 和 target 属性，然后再添加一些额外的属性
export type LoadingOptions = Partial<
    Omit<LoadingOptionsResolved, "parent" | "target"> & {
        target: HTMLElement | string;
        body: boolean;  // 表示加载组件是否覆盖整个 body
        zIndex?: number;  //表示加载组件的 z-index 层级
        onAfterLeave(): void;  // 在加载组件离开后调用的钩子函数
    }
>;