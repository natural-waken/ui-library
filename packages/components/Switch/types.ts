// import type { ComputedRef } from "vue";

// // Switch 组件的值类型，可以是布尔值、字符串或数字
// export type SwitchValueType = boolean | string | number;

// // 描述 Switch 组件的属性（props）
// export interface SwitchProps {
//     modelValue: SwitchValueType;  // 当前的值
//     disabled?: boolean;  // 组件是否禁用
//     activeText?: string;  // 激活状态下的文本
//     inactiveText?: string;  // 未激活状态下的文本
//     activeValue?: SwitchValueType; // 激活状态下的值
//     inactiveValue?: SwitchValueType;  // 未激活状态下的值
//     name?: string;  // 组件的名称
//     id?: string;  // ID
//     size?: "small" | "large";  // 大小
// }

// // Switch 组件可能发出的事件
// export interface SwitchEmits {
//     (e: "update:modelValue", value: SwitchValueType): void;
//     (e: "change", value: SwitchValueType): void;
// }

// // Switch 组件的实例方法和属性
// export interface SwitchInstance {
//     focus(): void;
//     checked: ComputedRef<boolean>;  // 是否处于选中状态
// }

import type { ComputedRef } from "vue";

export type SwitchValueType = boolean | string | number;

export interface SwitchProps {
    modelValue: SwitchValueType;
    disabled?: boolean;
    activeText?: string;
    inactiveText?: string;
    activeValue?: SwitchValueType;
    inactiveValue?: SwitchValueType;
    name?: string;
    id?: string;
    size?: "small" | "large";
}

export interface SwitchEmits {
    (e: "update:modelValue", value: SwitchValueType): void;
    (e: "change", value: SwitchValueType): void;
}

export interface SwitchInstance {
    focus(): void;
    checked: ComputedRef<boolean>;
}