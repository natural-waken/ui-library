import type {
    RuleItem,
    ValidateError,
    ValidateFieldsError,
} from "async-validator";  // 用于定义验证规则和错误信息
import type { Ref } from "vue";  // 定义响应式引用类型

export interface FormItemRule extends RuleItem {
    trigger?: string | string[];  // 表示触发验证的事件
}
export type FormRules = Record<string, FormItemRule[]>;

export type FormValidateResult = Promise<boolean>;  // 验证结果的类型
// 函数类型
export type FormValidateCallback = (
    isValid: boolean,
    invalidFields?: ValidateFieldsError
) => void;
// 用于表示验证状态
export type ValidateStatus = "success" | "error" | "init" | "validating";
// 用于描述验证失败的详细信息
export interface FormValidateFailuer {
    errors?: ValidateError[];
    fields: ValidateFieldsError;
}

// 表单的属性
export interface FormProps {
    model: Record<string, any>;  // 对象，包含表单数据
    rules?: FormRules;  // 用于定义验证规则
    disabled?: boolean;  // 表单是否禁用
    labelWidth?: number | string;  // 标签的宽度
    labelPosition?: "left" | "right" | "top";  // 标签的位置
    labelSuffix?: string;  // 标签的后缀
    showMessage?: boolean;  // 是否显示验证信息
    hideRequiredAsterisk?: boolean;  // 是否隐藏必填字段的星号
    requiredAsteriskPosition?: "left" | "right";  // 必填星号的位置
}

// 表单组件的事件
export interface FormEmits {
    (
        event: "validate",
        prop: FormItemProps,
        isValid: boolean,
        message: string
    ): void;
}

// 表单项的属性
export interface FormItemProps {
    prop?: string | string[];  // 绑定的字段名  指定当前表单项绑定的数据字段。它用于标识该表单项在表单数据模型中的位置    比如就像 username
    label?: string;  // 标签文本
    for?: string;  // 关联的输入元素 ID
    labelWidth?: number | string;  // 标签的宽度
    disabled?: boolean;  // 该表单项是否禁用
    required?: boolean;  // 该表单项是否必填
    showMessage?: boolean;  // 是否显示错误信息
    error?: string;  // 错误信息
    rules?: FormItemRule[];  // 该表单项的验证规则
}

// 表单实例的方法   里面四个都是方法
export interface FormInstance {
    validate(callback?: FormValidateCallback): FormValidateResult;  // 用于验证整个表单
    // 用于验证特定字段
    validateField(
        keys?: string[],
        callback?: FormValidateCallback
    ): FormValidateResult;
    // 用于重置表单字段
    resetFields(keys?: string[]): void;
    // 用于清除验证信息
    clearValidate(keys?: string[]): void;
}

// 表单项实例的方法和属性
export interface FormItemInstance {
    validateStatus: Ref<ValidateStatus>;  // 表示验证状态
    validateMessage: Ref<string>;  // 验证消息
    // 用于验证表单项
    validate(
        trigger: string,
        callback?: FormValidateCallback
    ): FormValidateResult;
    // 重置表单项
    resetField(): void;
    // 清除验证信息
    clearValidate(): void;
}

// 表单的上下文环境
export interface FormContext extends FormProps {
    emits: FormEmits;  // 表单的事件
    addField(field: FormItemContext): void;  // 用于添加表单项
    removeField(field: FormItemContext): void;  // 用于移除表单项
}
// 表单项的上下文环境
export interface FormItemContext extends FormItemProps {
    // 用于验证表单项
    validate(
        trigger: string,
        callback?: FormValidateCallback
    ): FormValidateResult;
    resetField(): void;  // 用于重置表单项
    clearValidate(): void;  // 用于清除验证信息
    addInputId(id: string): void;  // 用于添加输入元素的 ID
    removeInputId(id: string): void;  // 用于移除输入元素的 ID
}