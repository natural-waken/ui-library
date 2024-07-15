import { type Ref, computed } from "vue";

const defaultIdInjection = {
    prefix: Math.floor(Math.random() * 10000),  //  生成一个 0 到 9999 之间的随机数，用作 ID 的前缀
    current: 0,  // 初始化为 0，用于生成唯一 ID 时的递增计数器
};

export function useId(namespace: string = "li"): Ref<string> {
    const idRef = computed(
        () =>
            `${namespace}-${defaultIdInjection.prefix}-${defaultIdInjection.current++}`
    );
    return idRef;
}

export default useId;