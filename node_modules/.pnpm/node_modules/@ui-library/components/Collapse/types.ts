import type { Ref } from "vue";
export type CollapseItemName = string | number;

export interface CollapseProps {
    modelValue: CollapseItemName[];  // 为了实现 v-model
    accordion?: boolean;  // 指示组件是否以手风琴模式运行
}

export interface CollapseItemProps {
    name: CollapseItemName;  // 折叠项的名称
    title?: string;  // 用于设置折叠项的标题
    disabled?: boolean;
}

// 上下文  为了写 constants  key 
export interface CollapseContext {
    activeNames: Ref<CollapseItemName[]>;  // 包含当前展开的折叠项的名称数组   有哪些处于展开状态
    handleItemClick(name: CollapseItemName): void;  // 子组件的 click 事件  在父组件去做处理
}

export interface CollapseEmits {    // 这两个来去  为了实现 v-model
    (e: "update:modelValue", value: CollapseItemName[]): void;
    (e: "change", value: CollapseItemName[]): void;
}