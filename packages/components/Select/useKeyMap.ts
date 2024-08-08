import type { SelectOptionProps, SelectStates } from "ui-library";
import type { Ref, ComputedRef } from "vue";

// 描述 useKeyMap 函数的参数结构
interface KeyMapParams {
    isDropdownVisible: Ref<boolean>;
    highlightedLine: ComputedRef<SelectOptionProps | void>;
    hasData: ComputedRef<boolean>;
    lastIndex: ComputedRef<number>;
    selectStates: SelectStates;
    controlVisible(visible: boolean): void;
    handleSelect(option: SelectOptionProps): void;
}

// 函数接收一个 KeyMapParams 类型的对象作为参数，并解构这些参数
export default function useKeyMap({
    isDropdownVisible,
    controlVisible,
    selectStates,
    highlightedLine,
    handleSelect,
    hasData,
    lastIndex,
}: KeyMapParams) {
    // 创建一个 Map 对象 keyMap，用于存储键盘事件与对应处理函数之间的映射关系
    const keyMap: Map<string, Function> = new Map();

    keyMap.set("Enter", () => {
        // 如果下拉菜单是可见且有选中选项   调用
        if (
            isDropdownVisible.value &&
            selectStates.highlightedIndex >= 0 &&
            highlightedLine.value
        ) {
            handleSelect(highlightedLine.value as SelectOptionProps);
        }

        controlVisible(!isDropdownVisible.value);
    });

    // 要是可见的  就切换可见状态
    keyMap.set(
        "Escape",
        () => isDropdownVisible.value && controlVisible(!isDropdownVisible.value)
    );

    keyMap.set("ArrowUp", (e: KeyboardEvent) => {
        e.preventDefault();  // 阻止默认上下箭头键行为

        if (!hasData.value) return;  // 没有数据

        // 如果当前没有高亮选项或高亮是第一个选项，将高亮移到最后一个选项
        if (
            selectStates.highlightedIndex === -1 ||
            selectStates.highlightedIndex === 0
        ) {
            selectStates.highlightedIndex = lastIndex.value;
            return;
        }
        // 不然就直接 --  也就是上一个选项
        selectStates.highlightedIndex--;
    });

    keyMap.set("ArrowDown", (e: KeyboardEvent) => {
        e.preventDefault();
        if (!hasData.value) return;

        if (
            selectStates.highlightedIndex === -1 ||
            selectStates.highlightedIndex === lastIndex.value
        ) {
            selectStates.highlightedIndex = 0;
            return;
        }
        selectStates.highlightedIndex++;
    });

    return keyMap
}