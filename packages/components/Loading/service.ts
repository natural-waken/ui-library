// 这是我们函数式调用的方式

import type { LoadingOptions, LoadingOptionsResolved } from "./types";
import { ref, createApp, reactive, nextTick } from "vue";
import { useZIndex } from "@ui-library/hooks";
import LoadingComp from "./Loading.vue";
import { defer, delay, isNil, isString } from "lodash-es";

const RELATIVE_CLASS = "li-loading-parent--relative" as const;  // 表示加载组件父元素的相对定位类名
const HIDDEN_CLASS = "li-loading-parent--hiden" as const;  // 表示加载组件父元素的隐藏类名
const LOADING_NUMB_KEY = "li-loading-numb" as const;  // 表示加载组件父元素上的属性键名，用于记录加载组件数量
// 也就是这个元素被选择了几次加载组件

const instanceMap: Map<HTMLElement, LoadingInstance> = new Map();  // 用于存储每个目标元素与对应的加载组件实例的映射关系
const { nextZIndex } = useZIndex(30000);  // 从 useZIndex 中获取 nextZIndex 函数，初始值为 30000

// 创建加载组件实例
function createLoadingComponent(options: LoadingOptionsResolved) {
    const visible = ref(options.visible);  // 是否可见
    const afterLeaveFlag = ref(false);  // 是否在组件离开后销毁
    const handleAfterLeave = () => {
        // 在组件离开后调用，销毁组件
        // 第一次进来时 是 false 还没有真正离开  直接 return   第二次就是 destory  
        if (!afterLeaveFlag.value) return;
        destory();
    };

    // 加载组件的配置项和 onAfterLeave 回调
    const data = reactive({
        ...options,
        onAfterLeave: handleAfterLeave,
    });

    const setText = (text: string) => (data.text = text);  // 设置加载组件文本

    // Vue 应用实例，创建加载组件
    const app = createApp(LoadingComp, {
        ...data,
        zIndex: data.fullscreen ? nextZIndex() : void 0,
        visible,
    });
    // 将实例 app 挂载到一个新创建的 div 元素，并返回 Vue 实例 vm
    const vm = app.mount(document.createElement("div"));

    // 定义销毁加载组件函数   也就是注销个 loading 
    const destory = () => {
        const target = data.parent;  // 获取加载组件的父元素
        subtLoadingNumb(target);  // 减少父元素上的加载组件数量
        if (getLoadingNumb(target)) return;  // 如果父元素上仍有加载组件数量

        // 延迟移除父元素上的相对定位类名和隐藏类名
        delay(() => {
            removeRelativeClass(target);
            removeHiddenClass(target);
        }, 1);
        instanceMap.delete(target ?? document.body);  // 从 instanceMap 中删除该加载组件实例
        vm.$el?.parentNode?.removeChild(vm.$el);  // 从 DOM 中移除加载组件的根元素
        app.unmount();  // 卸载 Vue 应用实例
    };

    let afterLeaveTimer: number;
    // 关闭加载组件
    const close = () => {
        if (options.beforeClose && !options.beforeClose()) return;

        afterLeaveFlag.value = true;
        clearTimeout(afterLeaveTimer);
        afterLeaveTimer = defer(handleAfterLeave);  // 延迟调用 handleAfterLeave 函数，并存储定时器 ID

        visible.value = false;  // 不可见
        options.closed?.();   // 存在并调用
    };


    return {
        get $el(): HTMLElement {
            return vm.$el;
        },
        vm,
        close,
        visible,
        setText,
    };
}

// 解析加载组件的配置项，将 LoadingOptions 转换为 LoadingOptionsResolved
function resolveOptions(options: LoadingOptions): LoadingOptionsResolved {
    // 为什么要定义 target   因为我们要分为两种情况  
    // 要是在函数式调用时 就是元素 body  
    // 指令式就是去调用 loading 指令  这时就要变成具体结点了  使用  v-loading 那个结点
    let target: HTMLElement;
    if (isString(options.target)) {
        // 如果是不存在就是 body 元素
        target = document.querySelector(options.target) ?? document.body;
    } else {
        // 如果 options.target 不是字符串，则直接使用 options.target
        // 如果未定义 options.target，则设置为 document.body
        target = options.target || document.body;
    }

    // 如果 target 是 document.body 或 options.body 为 true，则设置 parent 为 document.body，否则设置为 target
    return {
        parent: target === document.body || options.body ? document.body : target,
        background: options.background ?? "rgba(0, 0, 0, 0.5)",
        spinner: options.spinner,
        text: options.text,
        // 如果 target 是 document.body 且 options.fullscreen 未定义或为 true，则设置 fullscreen 为 true，否则为 false
        fullscreen: target === document.body && (options.fullscreen ?? true),
        lock: options.lock ?? false,  // 要是 opts 没传 lock  就给个 false
        visible: options.visible ?? true,
        target,
    };
}

// 添加相对定位类名
function addRelativeClass(target: HTMLElement = document.body) {
    target.classList.add(RELATIVE_CLASS);
}
// 移除
function removeRelativeClass(target: HTMLElement = document.body) {
    target.classList.remove(RELATIVE_CLASS);
}

// 添加隐藏类名
function addHiddenClass(target: HTMLElement = document.body) {
    target.classList.add(HIDDEN_CLASS);
}
// 移除
function removeHiddenClass(target: HTMLElement = document.body) {
    target.classList.remove(HIDDEN_CLASS);
}

// 获取目标元素上的加载组件数量
function getLoadingNumb(target: HTMLElement = document.body) {
    // 返回目标元素上名为 LOADING_NUMB_KEY 的属性值
    return target.getAttribute(LOADING_NUMB_KEY);
}
// 移除 属性
function removeLoadingNumb(target: HTMLElement = document.body) {
    target.removeAttribute(LOADING_NUMB_KEY);
}

// 增加目标元素上的加载组件数量
function addLoadingNumb(target: HTMLElement = document.body) {
    const numb = getLoadingNumb(target) ?? "0";
    // 将目标元素上名为 LOADING_NUMB_KEY 的属性值增加 1
    target.setAttribute(LOADING_NUMB_KEY, `${Number.parseInt(numb) + 1}`);
}
// 减少
function subtLoadingNumb(target: HTMLElement = document.body) {
    const numb = getLoadingNumb(target);
    if (numb) {
        const newNumb = Number.parseInt(numb) - 1;  // 将 numb 转换为整数减 1
        if (newNumb === 0) {
            removeLoadingNumb(target);  // 从目标元素上移除名为 LOADING_NUMB_KEY 的属性  也就是关闭 loading 效果
        } else {
            target.setAttribute(LOADING_NUMB_KEY, `${newNumb}`);  // 将 newNumb 设置为目标元素上 LOADING_NUMB_KEY 的属性值
        }
    }
}

// 添加类名
function addClass(
    options: LoadingOptions,
    parent: HTMLElement = document.body
) {
    if (options.lock) {
        addHiddenClass(parent);  // 调用 addHiddenClass 函数，为父元素 parent 添加隐藏类名
    } else {
        removeHiddenClass(parent);  // 移除隐藏类名
    }

    addRelativeClass(parent);  // 为父元素 parent 添加相对定位类名
}

// 用于存储全屏加载组件的实例。初始值为 null，表示没有全屏加载组件实例
let fullscreenInstance: LoadingInstance | null = null;

// 定义一个类型别名 LoadingInstance，表示 createLoadingComponent 函数的返回类型。
// 这个类型包含了加载组件实例的各种方法和属性
export type LoadingInstance = ReturnType<typeof createLoadingComponent>;

// 返回整个 loading 实例
export function Loading(options: LoadingOptions = {}): LoadingInstance {
    const resolved = resolveOptions(options);
    const target = resolved.parent ?? document.body;

    // 判断是否需要全屏加载且全屏实例 fullscreenInstance 已存在
    if (resolved.fullscreen && !isNil(fullscreenInstance)) {
        // 就是如果存在全屏实例  我们就直接返回
        return fullscreenInstance;
    }

    // 增加 loading number  
    // 也就是我们在同一个目标上  多次调用 loading  只会出现同一个实例
    addLoadingNumb(resolved?.parent);
    // 判断 instanceMap 中是否已经存在目标元素 target 的加载组件实例
    if (instanceMap.has(target)) {
        return instanceMap.get(target)!;
    }

    // 创建个新加载组件实例 instance
    const instance = createLoadingComponent({
        ...resolved,
        closed: () => {
            resolved.closed?.();

            if (resolved.fullscreen) {
                // 如果是全屏加载组件，则将 fullscreenInstance 置为 null，表示当前没有全屏加载组件实例
                fullscreenInstance = null;
            }
            // 确保在关闭全屏加载组件时，fullscreenInstance 变量被正确地重置为 null。这样可以确保在再次创建全屏加载组件时不会出现冲突或重复实例。
        },
    });

    addClass(options, resolved?.parent);  // 根据 options 为目标元素 resolved.parent 添加或移除类名

    resolved.parent?.appendChild(instance.$el);  // 加载组件实例的根元素 instance.$el 添加到目标元素 resolved.parent 中
    // 相当于是把 loading 整个 dom 挂载进去    默认是在 body 

    nextTick(() => (instance.visible.value = !!resolved.visible));  // 可见性置为 true

    if (resolved.fullscreen) {
        fullscreenInstance = instance;  // 如果是全屏 就用 instance     这样就可以做到全屏单例了
    }
    instanceMap.set(target, instance);
    return instance;
}