import type { Ref } from "vue";
export type CollapseItemName = string | number;

export interface CollapseProps {
    // 表示当前选中的（或展开的）折叠项的名称列表
    modelValue: CollapseItemName[];  // 为了实现 v-model
    // 如果为 true，则每次只能展开一个折叠项；否则，可以同时展开多个折叠项。
    accordion?: boolean;  // 指示组件是否以手风琴模式运行
}

export interface CollapseItemProps {
    name: CollapseItemName;  // 折叠项的名称
    title?: string;  // 用于设置折叠项的标题
    disabled?: boolean;  // 表示该折叠项是否禁用
}

// 上下文  为了写 constants  key 
export interface CollapseContext {
    activeNames: Ref<CollapseItemName[]>;  // 包含当前展开的折叠项的名称数组   有哪些处于展开状态
    // 用于处理子组件的点击事件。在折叠面板中，当用户点击某个折叠项时，这个方法会被调用，并在父组件中处理该事件（如切换展开状态）。
    handleItemClick(name: CollapseItemName): void;  // 子组件的 click 事件  在父组件去做处理
}

export interface CollapseEmits {    // 这两个来去  为了实现 v-model
    // 通知父组件内部状态的更新
    (e: "update:modelValue", value: CollapseItemName[]): void;
    // 用于通知外部组件当前选中状态的变化，与 v-model 实现类似
    (e: "change", value: CollapseItemName[]): void;
}

