<!-- <script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import type { SwitchEmits, SwitchProps, SwitchInstance } from './types';
// import { debugWarn } from '@ui-library/utils';
import { useId } from '@ui-library/hooks';
// import { useFormItem, useFormDisabled, useFormItemInputId } from '../Form';

defineOptions({
    name: 'LiSwitch',
    inheritAttrs: false,
});
const props = withDefaults(defineProps<SwitchProps>(), {
    activeValue: true,
    inactiveValue: false,
});
const emits = defineEmits<SwitchEmits>();
const isDisabled = computed(() => props.disabled);
const inputId = useId().value;
// const isDisabled = useFormDisabled();
// const { formItem } = useFormItem();
// const { inputId } = useFormItemInputId(props, formItem);

const innerValue = ref(props.modelValue);
const inputRef = ref<HTMLInputElement>();
const checked = computed(() => innerValue.value === props.activeValue); // 选中状态

const focus: SwitchInstance['focus'] = function () {
    inputRef.value?.focus();
};

// 这个就是和下面 enter 绑定  是因为我们就可以根据 回车来控制 switch 选中状态
function handleChange() {
    if (isDisabled.value) return;

    const newVal = checked.value ? props.inactiveValue : props.activeValue;

    innerValue.value = newVal;
    emits('update:modelValue', newVal);
    emits('change', newVal);
}

onMounted(() => {
    inputRef.value!.checked = checked.value;
});
watch(checked, (val) => {
    inputRef.value!.checked = val;
    // 预留 form 校验
    // formItem?.validate('change').catch((err) => debugWarn(err));
});
watch(
    () => props.modelValue,
    (val) => (innerValue.value = val),
);

defineExpose<SwitchInstance>({
    focus,
    checked,
});
</script> -->

<script setup lang="ts">
import type { SwitchProps, SwitchEmits, SwitchInstance } from './types';
import { ref, computed, onMounted, watch } from 'vue';
import { useId } from '@ui-library/hooks';

defineOptions({ name: 'LiSwitch', inheritAttrs: false });
const props = withDefaults(defineProps<SwitchProps>(), {
    activeValue: true,
    inactiveValue: false,
});

const emits = defineEmits<SwitchEmits>();
const isDisabled = computed(() => props.disabled);

const innerValue = ref(props.modelValue);
const inputRef = ref<HTMLInputElement>();
const inputId = useId().value;
const checked = computed(() => innerValue.value === props.activeValue);

const focus: SwitchInstance['focus'] = function () {
    inputRef.value?.focus();
};
function handleChange() {
    if (isDisabled.value) return;
    const newVal = checked.value ? props.inactiveValue : props.activeValue;

    innerValue.value = newVal;

    emits('update:modelValue', newVal);

    emits('change', newVal);
}

onMounted(() => {
    inputRef.value!.checked = checked.value;
});
watch(checked, (val) => {
    inputRef.value!.checked = val;
    // 预留 form 校验
});

defineExpose<SwitchInstance>({
    checked,
    focus,
});
</script>

<!-- 这个 input 作用就是 我们隐藏了这个  根据 input 里面状态切换里面的样式状态 -->
<template>
    <div
        class="li-switch"
        :class="{
            [`li-switch--${size}`]: size,
            'is-disabled': isDisabled,
            'is-checked': checked,
        }"
        @click="handleChange"
    >
        <input
            class="li-switch__input"
            type="checkbox"
            role="switch"
            ref="inputRef"
            :id="inputId"
            :name="name"
            :disabled="isDisabled"
            :checked="checked"
            @keydown.enter="handleChange"
        />
        
        <div class="li-switch__core">
            <div class="li-switch__core-inner">
                <span
                    v-if="activeText || inactiveText"
                    class="li-switch__core-inner-text"
                >
                    {{ checked ? activeText : inactiveText }}
                </span>
            </div>
            <div class="li-switch__core-action"></div>
        </div>
    </div>
</template>

<style scoped>
@import './style.css';
</style>
