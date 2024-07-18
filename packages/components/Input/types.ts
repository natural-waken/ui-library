import type { Ref } from "vue";
export interface InputProps {
    id?: string;
    modelValue: string;  // 输入框的绑定值
    type?: string;  // 输入框的类型，如 "text"、"password" 等
    size?: "large" | "small";
    disabled?: boolean;  // 输入框是否禁用
    clearable?: boolean;  // 输入框是否显示清除按钮
    showPassword?: boolean;  // 是否显示密码切换按钮

    placeholder?: string;  // 输入框的占位符
    readonly?: boolean;  // 输入框是否只读
    autocomplete?: string;  // 输入框的自动完成功能
    autofocus?: boolean;  // 输入框是否自动获取焦点

    form?: string;  // 输入框所属的表单的 ID    这个在我们后面 form 中会用到
}

export interface InputEmits {
    (e: "update:modelValue", value: string): void;  // 在输入框值更新时触发，传递新的值

    (e: "input", value: string): void;  // 在输入时触发，传递当前输入的值
    // 修改值且 失去焦点 才触发'change'
    (e: "change", value: string): void;  // 在输入值改变并失去焦点时触发，传递改变后的值
    (e: "focus", value: FocusEvent): void;  // 在输入框获取焦点时触发，传递焦点事件
    (e: "blur", value: FocusEvent): void;  // 在输入框失去焦点时触发，传递焦点事件
    (e: "clear"): void;  // 在输入框清除内容时触发，不传递任何参数
}

export interface InputInstance {
    ref: Ref<HTMLInputElement | HTMLTextAreaElement | void>;  // 引用输入框的 DOM 元素
    focus(): Promise<void>;  // 使输入框获取焦点的方法
    blur(): void;  // 使输入框失去焦点的方法
    select(): void;  // 选择输入框内容的方法
    clear(): void;  // 清除输入框内容的方法
}
