// 这是指令式调用方式

import { type Directive, type DirectiveBinding, type MaybeRef } from "vue";  // 定义指令的类型
import type { LoadingOptions } from "./types";
import { type LoadingInstance, Loading } from "./service";

const INSTANCE_KEY = Symbol("loading");  // 用于在 DOM 元素上标记和存储加载实例。使用符号避免了属性名称冲突

// 这个接口表示一个可能包含加载实例的 HTML 元素
export interface ElementLoading extends HTMLElement {
    // 也就是我们这个是正处于加载状态的 html 标签
    [INSTANCE_KEY]?: {
        instance: LoadingInstance;
        options: LoadingOptions;
    };
}

// 用于创建加载组件实例并将其绑定到元素上
function createInstance(
    el: ElementLoading,
    binding: DirectiveBinding<boolean>
) {
    // 从元素的属性中获取加载组件的配置选项值
    const getProp = <K extends keyof LoadingOptions>(name: K) => {
        return el.getAttribute(`li-loading-${name}`) as MaybeRef<string>;
    };

    // 用于获取指令修饰符（例如 v-loading.fullscreen）的值
    const getModifier = <K extends keyof LoadingOptions>(name: K) => {
        return binding.modifiers[name];
    };

    // 获取指令修饰符 fullscreen 的值，用于确定加载组件是否应该全屏显示。
    const fullscreen = getModifier("fullscreen");

    // 加载组件所需的配置选项
    const options: LoadingOptions = {
        text: getProp("text"),
        spinner: getProp("spinner"),
        background: getProp("background"),
        target: fullscreen ? void 0 : el,
        body: getModifier("body"),
        lock: getModifier("lock"),
        fullscreen,
    };

    // 将创建的加载组件实例和选项存储到元素的 INSTANCE_KEY 属性上
    el[INSTANCE_KEY] = {
        options,
        instance: Loading(options),
    };
}

// 定义了 vLoading 指令的生命周期钩子
export const vLoading: Directive<ElementLoading, boolean> = {
    // mounted: 当元素被挂载到 DOM 上时，如果绑定值为 true，调用 createInstance 创建加载实例。
    mounted(el, binding) {
        if (binding.value) createInstance(el, binding);
    },
    // updated: 当绑定值发生变化时，根据新旧值决定是否创建或关闭加载实例。
    updated(el, binding) {
        if (binding.oldValue === binding.value) return;

        if (binding.value && !binding.oldValue) {
            createInstance(el, binding);
            return;
        }

        el[INSTANCE_KEY]?.instance?.close();
    },
    // unmounted: 当元素从 DOM 中卸载时，关闭加载实例并清理 INSTANCE_KEY 属性。
    unmounted(el) {
        el[INSTANCE_KEY]?.instance.close();
        el[INSTANCE_KEY] = void 0;
    },
};
