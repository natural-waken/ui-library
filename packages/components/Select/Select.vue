<script setup lang="ts">
import { find, get, each, noop, isFunction, filter, size, eq } from 'lodash-es';
import {
    ref,
    reactive,
    computed,
    provide,
    watch,
    nextTick,
    type VNode,
} from 'vue';
import type {
    SelectProps,
    SelectEmits,
    SelectOptionProps,
    SelectContext,
    SelectInstance,
    SelectStates,
} from './types';
import type { TooltipInstance } from '../Tooltip/types';
import type { InputInstance } from '../Input/types';
import { useId } from '@ui-library/hooks';
import { useFocusController, useClickOutside } from '@ui-library/hooks';
import { SELECT_CTX_KEY, POPPER_OPTIONS } from './constants';

import LiTooltip from '../Tooltip/Tooltip.vue';
import LiIcon from '../Icon/Icon.vue';
import LiInput from '../Input/Input.vue';
import LiOption from './Option.vue';

const COMPONENT_NAME = 'LiSelect' as const;
defineOptions({
    name: COMPONENT_NAME,
});
const props = withDefaults(defineProps<SelectProps>(), {
    options: () => [],
});
const emits = defineEmits<SelectEmits>();
const slots = defineSlots();

const selectRef = ref<HTMLElement>();
const tooltipRef = ref<TooltipInstance>();
const inputRef = ref<InputInstance>();
const isDropdownVisible = ref(false);

const initialOption = findOption(props.modelValue); // 就是为了获取初始值的

const selectStates = reactive<SelectStates>({
    inputValue: initialOption?.label ?? '',
    selectedOption: initialOption,
    mouseHover: false,
    loading: false,
    highlightedIndex: -1,
});

const isDisabled = computed(() => props.disabled);
const children = computed(() =>
    // slots?.default?.() 调用了默认插槽的渲染函数，返回插槽内容的虚拟节点数组
    // 回调函数检查每个插槽内容的类型是否等于 LiOption
    // 因为插槽里面可以写任何内容   我们要放 option
    // 判断下  必须是 option 组件才说明我们有 children
    filter(slots?.default?.(), (child) => eq(child.type, LiOption)),
);
// 判断是否有 size 数组长度
const hasChildren = computed(() => size(children.value) > 0);
// 三个条件都满足时   再展示清空按钮
// 鼠标当前悬停在组件上  并且要有值在时
const showClear = computed(
    () =>
        props.clearable &&
        selectStates.mouseHover &&
        selectStates.inputValue !== '',
);

const highlightedLine = computed(() => {
    let result: SelectOptionProps | void;
    if (hasChildren.value) {
        const node = children.value[selectStates.highlightedIndex];
        result = node?.props?.value;
    } else {
        result = props.options[selectStates.highlightedIndex];
    }
    return result;
});

const inputId = useId().value;
const {
    wrapperRef: inputWrapperRef,
    isFocused,
    handleBlur,
    handleFocus,
} = useFocusController(inputRef);

useClickOutside(selectRef, (e) => handleClickOutsie(e));
const focus: SelectInstance['focus'] = function () {
    inputRef.value?.focus();
};

const blur: SelectInstance['blur'] = function () {
    handleClickOutsie();
};

function handleClickOutsie(e?: Event) {
    if (isFocused.value) {
        nextTick(() => handleBlur(new FocusEvent('focus', e)));
    }
}

// 如果禁用  不可见
function toggleVisible() {
    if (isDisabled.value) return;
    controlVisible(!isDropdownVisible.value);
}

// 控制可见性
function controlVisible(visible: boolean) {
    if (!tooltipRef.value) return; // 要是 tooltip 还没加载出来  就先 return
    get(tooltipRef, ['value', visible ? 'show' : 'hide'])?.(); // visible 为 true  就调用 show   不然就是 hide
    isDropdownVisible.value = visible;
    emits('visible-change', visible);

    selectStates.highlightedIndex = -1;
    // 相当于是每次我们切换可见性时  它的 highlight 就清空  不影响我们下次选择的状态
}

function handleClear() {
    inputRef.value?.clear(); // input 框清空
    selectStates.inputValue = '';
    selectStates.selectedOption = null; // 没有选中的选项

    emits('clear'); // 发布事件  通知外部组件或父组件清除操作已执行

    // 并对每个元素调用 emits 函数，发布 change 和 update:modelValue 事件
    each(['change', 'update:modelValue'], (k) => emits(k as any, ''));
    // 预留 formItem 表单校验
}

// 传入个字符串   从我们 props options 中找到个默认值
function findOption(value: string) {
    return find(props.options, (opt) => opt.value === value);
}

function handleSelect(opt: SelectOptionProps) {
    if (opt.disabled) return; // 就是这项禁用了的话  再怎么点击也没用  直接返回出去了

    selectStates.inputValue = opt.label;
    selectStates.selectedOption = opt;
    each(['change', 'update:modelValue'], (k) => emits(k as any, opt.value));
    controlVisible(false); // 也就是我们点击之后  就会自动关闭
    inputRef.value?.focus(); // 给 input 聚焦
}

// 相当于是我们可以自己定义  label  类型
function renderLabel(opt: SelectOptionProps): VNode | string {
    // 如果说我们 props 上自己定义了 renderLabel   那我们就去调用这个函数
    if (isFunction(props.renderLabel)) {
        return props.renderLabel(opt);
    }
    return opt.label;
}

function setSelected() {
    // 找到的话就更新下  值
    const option = findOption(props.modelValue);
    if (!option) return;
    selectStates.inputValue = option.label;
    selectStates.selectedOption = option;
}

watch(
    () => props.modelValue,
    () => {
        // 表单校验  逻辑 change
        setSelected();
    },
);

provide<SelectContext>(SELECT_CTX_KEY, {
    handleSelect,
    selectStates,
    renderLabel,
    highlightedLine,
});

defineExpose<SelectInstance>({
    focus,
    blur,
});
</script>

<template>
    <div
        ref="selectRef"
        class="li-select"
        :class="{
            'is-disabled': isDisabled,
        }"
        @click.stop="toggleVisible"
        @mouseenter="selectStates.mouseHover = true"
        @mouseleave="selectStates.mouseHover = false"
    >
        <li-tooltip
            ref="tooltipRef"
            placement="bottom-start"
            :popper-options="POPPER_OPTIONS"
            @click-outside="controlVisible(false)"
            manual
        >
            <template #default>
                <div ref="inputWrapperRef">
                    <li-input
                        ref="inputRef"
                        v-model="selectStates.inputValue"
                        :id="inputId"
                        :disabled="isDisabled"
                        :placeholder="placeholder"
                        :readonly="!filterable || !isDropdownVisible"
                        @focus="handleFocus"
                        @blur="handleBlur"
                    >
                        <template #suffix>
                            <!-- 这个是清空按钮 -->
                            <li-icon
                                v-if="showClear"
                                icon="circle-xmark"
                                class="li-input__clear"
                                @click.stop="handleClear"
                                @mousedown.prevent="noop"
                            />
                            <li-icon
                                v-else
                                class="header-angle"
                                icon="angle-down"
                                :class="{ 'is-active': isDropdownVisible }"
                            />
                        </template>
                    </li-input>
                </div>
            </template>

            <template #content>
                <!-- 相当于是 ul  是我们的菜单  里面有 option  每项本质是 li -->
                <ul class="li-select__menu">
                    <!-- 这个判断就是我们没有子组件 li-option  那我们就是用传值进来的 option 去循环 -->
                    <!-- 这里也就是我们上次说的两种方式 -->
                    <template v-if="!hasChildren">
                        <li-option
                            v-for="item in options"
                            :key="item.value"
                            v-bind="item"
                        />
                    </template>
                    <template v-else>
                        <slot></slot>
                    </template>
                </ul>
            </template>
        </li-tooltip>
    </div>
</template>

<style scoped>
@import './style.css';
</style>
