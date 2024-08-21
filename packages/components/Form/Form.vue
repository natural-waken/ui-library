<script setup lang="ts">
import type {
    FormProps,
    FormEmits,
    FormItemContext,
    FormContext,
    FormInstance,
} from './types';

import { FORM_CTX_KEY } from './constants';
import { reactive, toRefs, provide } from 'vue';
import { each, filter, includes, size } from 'lodash-es';
import type { ValidateFieldsError } from 'async-validator'; // 用于描述验证错误

defineOptions({ name: 'LiForm' });
const props = withDefaults(defineProps<FormProps>(), {
    showMessage: true, // 默认显示验证信息
    hideRequiredAsterisk: false, // 默认不隐藏必填字段的星号
    requiredAsteriskPosition: 'left', // 默认将必填星号放在左侧
    labelPosition: 'right', // 默认将标签放在右侧
});

// defineEmits 函数用于声明组件会发射的事件
const emits = defineEmits<FormEmits>(); // 定义组件的事件类型

const fields: FormItemContext[] = []; // 用于存储表单项的上下文

// 用于验证给定的表单项数组
async function doValidateField(fields: FormItemContext[] = []) {
    let validateErrors: ValidateFieldsError = {};
    // 遍历每个表单项  并调用其自身定义的 validate 方法      如果验证失败  捕获错误并合并到 validateErrors
    for (const field of fields) {
        try {
            // 传个空的相当于是把所有都执行验证
            await field.validate('');
        } catch (error) {
            validateErrors = {
                ...validateErrors,
                ...(error as ValidateFieldsError),
            };
        }
    }
    if (!size(Object.keys(validateErrors))) return true; // 为空  表示验证通过
    return Promise.reject(validateErrors); // 返回一个被拒绝的 Promise   包含验证错误
}

// 用于将新的表单项添加到 fields 数组中
const addField: FormContext['addField'] = function (field) {
    if (!field.prop) return;
    fields.push(field);
};
// 用于从 fields 数组中移除指定的表单项
const removeField: FormContext['removeField'] = function (field) {
    if (!field.prop) return;
    fields.splice(fields.indexOf(field), 1);
};

// 用于验证所有表单项
// 我们真实逻辑是在下面那个   这个相当于是门面   这就是门面模式
const validate: FormInstance['validate'] = async function (callback) {
    // 调用 validateField 函数并传入空数组作为键，表示验证所有项
    // 传入空数组  就是验证所有规则   传入某个 就是指定的
    return validateField([], callback);
};
// 用于验证指定的表单项
const validateField: FormInstance['validateField'] = async function (
    keys,
    callback,
) {
    try {
        // 过滤出需要验证的表单项   并且使用 doValidateField 验证这些表单项
        const result = await doValidateField(filterFields(fields, keys ?? []));
        if (result === true) {
            callback?.(result); // 验证通过 调用回调函数并返回结果
        }
        return result;
    } catch (error) {
        // 验证失败 捕获错误并调用回调函数
        if (error instanceof Error) throw error;
        const invalidFields = error as ValidateFieldsError;
        callback?.(false, invalidFields);
        return Promise.reject(invalidFields);
    }
};
// 重置指定的表单项
const resetFields: FormInstance['resetFields'] = function (keys) {
    // 根据 keys 来筛选出需要重置的表单项
    // 使用 each 遍历被过滤的表单项         并调用它们的 resetField 方法  将其值重置为初始状态
    each(filterFields(fields, keys ?? []), (field) => field.resetField());
};
// 清除指定表单项的验证信息
const clearValidate: FormInstance['clearValidate'] = function (keys) {
    // 使用 each 遍历被过滤的表单项  并调用它们的 clearValidate 方法
    each(filterFields(fields, keys ?? []), (field) => field.clearValidate());
};

// 根据给定的键过滤表单项：
// 如果提供了键，则返回匹配键的表单项。              如果未提供键，则返回所有表单项。
function filterFields(fields: FormItemContext[], keys: string[]) {
    return size(keys)
        ? filter(fields, (field) => includes(keys, field.prop))
        : fields;
}

// form 上下文
// 包含表单的属性、事件和方法
// toRefs 用于将 props 的属性转换为 ref，确保它们是响应式
// emits  用于在表单中发射事件，例如验证成功或失败的事件
// add remove 管理表单中的表单项，确保可以动态地添加或移除表单项
// provide 将表单的状态和方法提供给所有子组件
const formCtx: FormContext = reactive({
    ...toRefs(props),
    emits,
    addField,
    removeField,
});
// 使用 provide 提供 formCtx，以便在组件树中下层组件可以使用 inject 访问
provide<FormContext>(FORM_CTX_KEY, formCtx);
//  将特定的表单实例方法公开给外部组件
defineExpose<FormInstance>({
    validate,
    validateField,
    resetFields,
    clearValidate,
});
</script>

<template>
    <form class="li-form">
        <slot></slot>
    </form>
</template>
