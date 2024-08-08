import type { VNode, ComputedRef } from "vue";  // VNode 虚拟 DOM 节点

// RenderLabelFunc 是一个函数类型，该函数接受一个 SelectOptionProps 类型的参数，并返回一个 VNode 或 string
export type RenderLabelFunc = (option: SelectOptionProps) => VNode | string;
// CustomFilterFunc 是一个函数类型，该函数接受一个 string 类型的参数，并返回一个 SelectOptionProps 类型的数组。
export type CustomFilterFunc = (value: string) => SelectOptionProps[];
// 该函数接受一个 string 类型的参数，并返回一个 Promise，这个 Promise 会解析为一个 SelectOptionProps 类型的数组或 void
export type CustomFilterRemoteFunc = (
    value: string
) => Promise<SelectOptionProps[] | void>;

// Select option  组件的选项属性
export interface SelectOptionProps {
    value: string;
    label: string;
    disabled?: boolean;
}

// Select 组件的属性
export interface SelectProps {
    modelValue: string;  // 绑定值
    id?: string;  // 可选的组件 ID
    options?: SelectOptionProps[];  // 选项数组
    placeholder?: string;   // 占位符
    disabled?: boolean;  // 禁用状态
    clearable?: boolean;  // 清除按钮
    renderLabel?: RenderLabelFunc;  // 自定义标签渲染函数
    filterable?: boolean;  // 筛选功能
    filterMethod?: CustomFilterFunc;  // 自定义筛选函数
    remote?: boolean;  // 远程数据加载标志
    remoteMethod?: CustomFilterRemoteFunc;  // 自定义远程数据加载函数
}

// Select 组件的内部状态
export interface SelectStates {
    inputValue: string;  // 输入框的值
    selectedOption: SelectOptionProps | void | null;  // 当前选中的选项
    mouseHover: boolean;  //  鼠标是否悬停在组件上
    loading: boolean;  // 是否在加载数据
    highlightedIndex: number;  // 当前高亮选项的索引
}

// Select 组件的事件
export interface SelectEmits {
    (e: "update:modelValue", value: string): void;  //  更新绑定值事件，传递新的值s
    (e: "change", value: string): void;  // 值改变事件，传递新的值
    (e: "visible-change", vlaue: boolean): void;  // 可见性改变事件，传递新的可见性状态

    (e: "clear"): void;  // 清除事件
    (e: "focus"): void;  //  聚焦事件
    (e: "blur"): void;  // 失焦事件
}

// Select 组件的上下文
// 用作依赖注入上下文   每次依赖注入我们都会触发 handleSelect 方法
export interface SelectContext {
    selectStates: SelectStates;  // 组件的状态
    renderLabel?: RenderLabelFunc;  // 自定义标签渲染函数
    highlightedLine?: ComputedRef<SelectOptionProps | void>;  // 当前高亮的选项
    handleSelect(item: SelectOptionProps): void;  // 处理选项选择的方法
}

// Select 组件的实例方法
export interface SelectInstance {
    focus(): void;
    blur(): void;
}