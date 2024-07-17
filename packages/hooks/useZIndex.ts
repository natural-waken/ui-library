import { computed, ref } from "vue";

const zIndex = ref(0);

// 就是生成每个的 z-index    在之前上面添加
// 该函数接受一个可选参数 initVal，用于初始化 z-index 的基础值，默认值为 2000
export default function useZIndex(initVal = 2000) {
    const _initVal = ref(initVal);  // 存储传入的初始 z-index 值
    const currentZIndex = computed(() => zIndex.value + _initVal.value);  // 当前 z-index 值加上初始 z-index 值

    const nextZIndex = () => {  // 用于生成下一个 z-index 值
        zIndex.value++;
        return currentZIndex.value;
    };

    return {
        initialValue: _initVal,
        currentZIndex,
        nextZIndex,
    };
}
