<script setup lang="ts">
import { ref, computed, watch, useAttrs, shallowRef, nextTick } from 'vue';
import { useFocusController } from '@ui-library/hooks';
import { useFormItem, useFormDisabled, useFormItemInputId } from '../Form';
import { each, noop } from 'lodash-es';
import type { InputProps, InputEmits, InputInstance } from './types';

import Icon from '../Icon/Icon.vue';
import { debugWarn } from '@ui-library/utils';

defineOptions({
    name: 'LiInput',
    inheritAttrs: false, // 组件不会自动继承父组件的属性
});

const props = withDefaults(defineProps<InputProps>(), {
    type: 'text',
    autocomplete: 'off',
});

const emits = defineEmits<InputEmits>();

const innerValue = ref(props.modelValue); // 存储输入框或文本域的值
const pwdVisible = ref(false); // 控制密码是否可见

const inputRef = shallowRef<HTMLInputElement>();
const textareaRef = shallowRef<HTMLTextAreaElement>();

const attrs = useAttrs(); // 获取的组件的所有非 prop 属性
const { formItem } = useFormItem();

const _ref = computed(() => inputRef.value || textareaRef.value);
// const isDisabled = computed(() => props.disabled);
const isDisabled = useFormDisabled(); // 这个方法里面就是我们取到的当前组件 disabled 或者是 form
// 再把 inputId 写了
const { inputId } = useFormItemInputId(props, formItem);

// 确定是否显示清除按钮
// clearable 属性为真、innerValue 不为空、未禁用，并且组件处于焦点状态
const showClear = computed(
    () =>
        props.clearable &&
        !!innerValue.value &&
        !isDisabled.value &&
        isFocused.value,
);
// 确定是否显示密码可见性切换按钮
// type 属性为 'password'、showPassword 为真、未禁用，并且 innerValue 不为空
const showPwdArea = computed(
    () =>
        props.type === 'password' &&
        props.showPassword &&
        !isDisabled.value &&
        !!innerValue.value,
);

const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(
    _ref,
    {
        afterBlur() {
            // form 校验
            // 也就是说   每个 rule 和 blur 相关的都校验
            formItem?.validate('blur').catch((err) => debugWarn(err));
        },
    },
);

// 清空输入框或文本域的值
const clear: InputInstance['clear'] = function () {
    innerValue.value = '';
    each(['input', 'change', 'update:modelValue'], (e) => emits(e as any, ''));
    emits('clear');
    // 清空表单校验
    formItem?.clearValidate();
};
const focus: InputInstance['focus'] = async function () {
    await nextTick();
    _ref.value?.focus();
};

const blur: InputInstance['blur'] = function () {
    _ref.value?.blur();
};

const select: InputInstance['select'] = function () {
    _ref.value?.select();
};

function handleInput() {
    emits('update:modelValue', innerValue.value);
    emits('input', innerValue.value);
}

function handleChange() {
    emits('change', innerValue.value);
}

function togglePwdVisible() {
    pwdVisible.value = !pwdVisible.value;
}

watch(
    () => props.modelValue,
    (newVal) => {
        innerValue.value = newVal;
        // 表单校验触发
    },
);

defineExpose<InputInstance>({
    ref: _ref,
    focus,
    blur,
    select,
    clear,
});
</script>

<template>
    <div
        class="li-input"
        :class="{
            [`li-input--${type}`]: type,
            [`li-input--${size}`]: size,
            'is-disabled': isDisabled,
            'is-prepend': $slots.prepend,
            'is-append': $slots.append,
            'is-prefix': $slots.prefix,
            'is-suffix': $slots.suffix,
            'is-focus': isFocused,
        }"
    >
        <template v-if="type !== 'textarea'">
            <!-- 两个插槽 prepend 和 append 分别用于在输入框的前后插入额外的内容。常见的内容包括图标、文本、按钮等 -->
            <!-- 如果存在 prepend 插槽，渲染并插入 prepend 插槽内容 -->
            <div v-if="$slots.prepend" class="li-input__prepend">
                <slot name="prepend"></slot>
            </div>

            <div class="li-input__wrapper" ref="wrapperRef">
                <span v-if="$slots.prefix" class="li-input__prefix">
                    <slot name="prefix"></slot>
                </span>

                <!-- 动态绑定输入框 ID，确保每个输入框有唯一 ID
                    v-model 双向绑定 innerValue
                    v-bind="attrs" 绑定所有其他属性
                  -->
                <input
                    class="li-input__inner"
                    ref="inputRef"
                    :id="inputId"
                    :type="
                        showPassword ? (pwdVisible ? 'text' : 'password') : type
                    "
                    :disabled="isDisabled"
                    :readonly="readonly"
                    :autocomplete="autocomplete"
                    :placeholder="placeholder"
                    :autofocus="autofocus"
                    :form="form"
                    v-model="innerValue"
                    v-bind="attrs"
                    @input="handleInput"
                    @change="handleChange"
                    @focus="handleFocus"
                    @blur="handleBlur"
                />
                <span
                    v-if="$slots.suffix || showClear || showPwdArea"
                    class="li-input__suffix"
                >
                    <!-- 插入 suffix 插槽内容 -->
                    <slot name="suffix"></slot>
                    <!-- 如果 showClear 为 true，渲染 Icon 组件，设置图标为 "circle-xmark"，设置点击事件处理方法 clear，并阻止 mousedown 事件默认行为 -->
                    <Icon
                        icon="circle-xmark"
                        v-if="showClear"
                        class="li-input__clear"
                        @click="clear"
                        @mousedown.prevent="noop"
                    />
                    <Icon
                        icon="eye"
                        class="li-input__password"
                        v-if="showPwdArea && pwdVisible"
                        @click="togglePwdVisible"
                    />
                    <Icon
                        icon="eye-slash"
                        class="li-input__password"
                        v-if="showPwdArea && !pwdVisible"
                        @click="togglePwdVisible"
                    />
                </span>
            </div>
            <div v-if="$slots.append" class="li-input__append">
                <slot name="append"></slot>
            </div>
        </template>

        <template v-else>
            <!-- 文本域 -->
            <textarea
                class="li-textarea__wrapper"
                ref="textareaRef"
                :id="inputId"
                :disabled="isDisabled"
                :readonly="readonly"
                :autocomplete="autocomplete"
                :placeholder="placeholder"
                :autofocus="autofocus"
                :form="form"
                v-model="innerValue"
                v-bind="attrs"
                @input="handleInput"
                @change="handleChange"
                @focus="handleFocus"
                @blur="handleBlur"
            ></textarea>
        </template>
    </div>
</template>

<style>
@import './style.css';
</style>
