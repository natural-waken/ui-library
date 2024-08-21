import { computed, getCurrentInstance, type ComputedRef } from "vue";
// getCurrentInstance 用于获取当前组件的实例

// 获取 Vue 组件的某个 prop 属性并返回其值
export default function useProp<T>(propName: string): ComputedRef<T> {
    // 获取当前组件实例
    const instance = getCurrentInstance();
    // 如果没有获取到（即 instance 为 null 或 undefined），则抛出错误，因为 useProp 函数只能在组件内部调用
    if (!instance) {
        throw new Error("useProp must be called within a component");
    }
    // 通过访问组件实例的 proxy 对象的 $props 属性获取
    return computed(() => (instance?.proxy?.$props as any)?.[propName] as T);
}