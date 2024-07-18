
// 处理聚焦和失焦事件
import { isFunction } from "lodash-es";
import { getCurrentInstance, ref, type Ref } from "vue";
import useEventListener from "./useEventListener";

// 接口定义了三个可选的钩子函数
interface UseFocusControllerOptions {
    afterFocus?(): void;  // 聚焦后调用的函数s
    beforeBlur?(event: FocusEvent): boolean | void;  // 失焦前调用的函数，返回 boolean 或 void
    afterBlur?(): void;  // 失焦后调用
}

// 接受两个参数：       target：一个引用类型的目标元素。
// 可选的 UseFocusControllerOptions 配置对象，包含聚焦和失焦的钩子函数
export function useFocusController<T extends HTMLElement | { focus(): void }>(
    target: Ref<T | void>,
    { afterBlur, beforeBlur, afterFocus }: UseFocusControllerOptions = {}
) {
    const instance = getCurrentInstance()!;  // 获取当前组件实例
    const { emit } = instance;
    const wrapperRef = ref<HTMLElement>();  // 包装元素的引用
    const isFocused = ref(false);

    // 定义聚焦处理函数 
    const handleFocus = (event: FocusEvent) => {
        // 如果元素已经聚焦，则返回。
        // 否则，将 isFocused 设置为 true。
        // 触发 focus 事件，并调用 afterFocus 钩子函数（如果存在）
        if (isFocused.value) return;
        isFocused.value = true;
        emit("focus", event);
        afterFocus?.();
    };

    // 定义失焦处理函数
    const handleBlur = (event: FocusEvent) => {
        // 调用 beforeBlur 钩子函数（如果存在），并检查其返回值。
        // 如果 beforeBlur 返回 true 或失焦事件的目标在 wrapperRef 内，则取消失焦处理。
        // 否则，将 isFocused 设置为 false。
        // 触发 blur 事件，并调用 afterBlur 钩子函数（如果存在）
        const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false;
        // event.relatedTarget 是失焦事件的目标元素。该检查用于防止因点击 wrapperRef 内部元素而触发失焦
        // event.relatedTarget 是触发失焦事件的元素。如果该元素在 wrapperRef 内，则认为失焦处理被取消
        // 检查 cancelBlur 是否为 true，如果是，则直接返回，不继续执行后面的代码。
        // 如果 cancelBlur 为 false，则检查 event.relatedTarget 是否存在，且是否在 wrapperRef 的 DOM 节点内
        if (
            cancelBlur ||
            (event.relatedTarget &&
                wrapperRef.value?.contains(event.relatedTarget as Node))
        )
            return;

        isFocused.value = false;  // 不再聚焦
        emit("blur", event);  // 用于通知父组件或其他部分当前组件已经失焦
        afterBlur?.();  // 存在就调用
    };

    // 当元素被点击时，使目标元素聚焦
    const handleClick = () => {
        target.value?.focus();
    };

    useEventListener(wrapperRef, "click", handleClick);

    return {
        wrapperRef,
        isFocused,
        handleFocus,
        handleBlur,
    };
}

export default useFocusController;
