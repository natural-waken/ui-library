import { type Ref, computed } from "vue";

interface UseOffsetOptions {
    offset: number;
    boxHeight: Ref<number>;
    getLastBottomOffset(): number;
}

interface UseOffsetResult {
    topOffset: Ref<number>;  // 消息框的顶部偏移量
    bottomOffset: Ref<number>;  // 消息框的底部偏移量
}

export function useOffset(opts: UseOffsetOptions): UseOffsetResult {
    const lastBottomOffset = computed(() => opts.getLastBottomOffset());  // 上一个消息框的底部偏移量

    const topOffset = computed(() => opts.offset + lastBottomOffset.value);
    // 初始偏移量 opts.offset 与上一个消息框的底部偏移量 lastBottomOffset.value 相加

    const bottomOffset = computed(() => topOffset.value + opts.boxHeight.value);
    // 将 topOffset.value 与消息框的高度 opts.boxHeight.value 相加
    return {
        topOffset,
        bottomOffset,
    };
}

export default useOffset;








