import { inject } from "vue";  // inject 是 Vue 3 中用于在组件中获取祖先组件提供的依赖项的函数。它可以访问用 provide 提供的数据
import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from "./constants";
import {
    computed,
    onMounted,
    onUnmounted,
    ref,
    toRef,
    unref,
    watch,
    type MaybeRef,
    type WatchStopHandle,
} from "vue";
import { useId, useProp } from "@ui-library/hooks";
import type { FormItemContext } from "./types";

// 这个函数通常用于在 Vue 组件中获取与表单相关的上下文信息
export function useFormItem() {
    // form 注入
    const form = inject(FORM_CTX_KEY, void 0);  // 如果该键未提供任何值，则默认返回 void 0
    // formItem 注入
    const formItem = inject(FORM_ITEM_CTX_KEY, void 0);
    return { form, formItem };
}

// 用于确定表单项是否禁用
export function useFormDisabled(fallback?: MaybeRef<boolean | void>) {
    // 当前组件的 disabled 属性
    const disabled = useProp<boolean>("disabled");
    // 获取上下文
    const form = inject(FORM_CTX_KEY, void 0);
    const formItem = inject(FORM_ITEM_CTX_KEY, void 0);

    // 如果 disabled 为 true，则返回 true    不然接着往下看
    // 解包 fallback，如果 fallback 是 true，则返回 true
    return computed(
        () =>
            disabled.value ||
            unref(fallback) ||
            form?.disabled ||
            formItem?.disabled ||
            false
    );
}

// 加个 id
interface UseFormItemInputCommenProps extends Record<string, any> {
    id?: string;
}

// 用于管理表单项输入的 id 属性
// 尤其是在处理动态表单元素时，确保 id 的唯一性和一致性
// 通过监听 props.id 的变化，该函数可以动态地为表单元素分配或更新 id，并在组件卸载时清理 id
// tip:          这个函数  返回的 inputId 可以用于绑定到表单元素的 id 属性，确保每个表单元素都有唯一的 id，特别是在动态生成的表单中
export function useFormItemInputId(
    props: UseFormItemInputCommenProps, // 传入组件的 `props`，其中可能包含 `id` 属性
    formItemContext?: FormItemContext // 可选的表单项上下文，提供了一些与表单相关的方法
) {
    const inputId = ref<string>(""); // 定义一个响应式变量 `inputId`，初始化为空字符串

    let unwatch: WatchStopHandle | void; // 声明一个变量 `unwatch`，它会用于存储 `watch` 返回的停止监听的函数

    onMounted(() => {
        // watch 来监听 props.id 变化，并将返回值赋给 unwatch，以便在不再需要时停止监听
        unwatch = watch(
            toRef(() => props.id), // 使用 `toRef` 将 `props.id` 转换为一个响应式引用，监听 id 变化
            (id) => { // 当 `id` 变化时触发这个回调函数
                const newId = id ?? useId().value; // 如果 id 不存在，使用 `useId` 函数生成个新的 `id`
                if (newId !== inputId.value) { // 如果新 `id` 与当前 `inputId` 不同
                    inputId.value && formItemContext?.removeInputId(inputId.value); // 如果已有 `inputId`，则从表单项上下文中移除旧的 `id`
                    formItemContext?.addInputId(newId); // 将新 `id` 添加到表单项上下文中
                    inputId.value = newId; // 更新 `inputId`
                }
            },
            {
                immediate: true, // 立即执行回调函数，以确保初始值被正确设置  监听器在第一次调用时立即执行回调函数
            }
        );
    });

    onUnmounted(() => {
        unwatch && unwatch(); // 有 `unwatch` 函数，则调用它来停止监听 `id` 的变化
        inputId.value && formItemContext?.removeInputId(inputId.value); // 如果 `inputId` 存在，则从表单项上下文中移除它
    });

    return {
        inputId, // 返回 `inputId` 作为该函数的输出
    };
}
