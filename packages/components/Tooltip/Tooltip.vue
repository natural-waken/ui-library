<script setup lang="ts">
import { createPopper, type Instance } from '@popperjs/core';
import { ref, watch, watchEffect, onUnmounted, computed, type Ref } from 'vue';
import { bind, debounce, type DebouncedFunc } from 'lodash-es';
import { useClickOutside } from '@ui-library/hooks';

import type { TooltipProps, TooltipEmits, TooltipInstance } from './types';
import type { ButtonInstance } from '../Button';

import useEvenstToTiggerNode from './useEventsToTiggerNode';

defineOptions({
    name: 'Tooltip',
});

interface _TooltipProps extends TooltipProps {
    virtualRef?: HTMLElement | ButtonInstance | void;
    virtualTriggering?: boolean;
}

const props = withDefaults(defineProps<_TooltipProps>(), {
    placement: 'bottom',
    trigger: 'hover',
    transition: 'fade',
    showTimeout: 0,
    hideTimeout: 200,
});
const emits = defineEmits<TooltipEmits>();
const visible = ref(false); // 控制 Tooltip 的显示与隐藏

// 存储不同的事件处理函数
const events: Ref<Record<string, EventListener>> = ref({});
const outerEvents: Ref<Record<string, EventListener>> = ref({});
const dropdownEvents: Ref<Record<string, EventListener>> = ref({});

const containerNode = ref<HTMLElement>(); // 根节点容器，它包裹了整个 Tooltip 组件
const popperNode = ref<HTMLElement>(); // 弹出内容节点
const _triggerNode = ref<HTMLElement>(); // 触发节点，即用户与之交互以触发 Tooltip 显示的元素，如按钮或图标。

// props 动态计算出最终的触发节点
// 主要是为了支持虚拟触发节点的情况   在某些场景中，可能需要通过外部的虚拟节点来控制 Tooltip 的显示，而不仅仅是通过固定的 DOM 节点
const triggerNode = computed(() => {
    if (props.virtualTriggering)
        return (
            // @tips any 为了 fix 一个初始设计上的小失误 （后续重构 "虚拟目标节点" 时解决）
            ((props.virtualRef as ButtonInstance)?.ref as any) ??
            (props.virtualRef as HTMLElement) ??
            _triggerNode.value
        );
    return _triggerNode.value as HTMLElement;
});

// 用于生成传递给 Popper.js 的配置对象
const popperOptions = computed(() => ({
    // 指定 Tooltip 相对于触发节点的位置
    placement: props.placement,
    modifiers: [
        {
            name: 'offset',
            // 用于指定 Tooltip 的偏移量
            options: {
                offset: [0, 9],
            },
        },
    ],
    //  允许外部传入自定义的 Popper.js 配置选项，这样可以灵活地扩展或覆盖默认配置
    ...props.popperOptions,
}));

// 工具提示在触发或关闭时的延迟时间
const openDelay = computed(() =>
    // 当 trigger 属性为 hover 时，使用 props.showTimeout（即鼠标悬停时的显示延迟）；否则，延迟时间为 0
    props.trigger === 'hover' ? props.showTimeout : 0,
);
const closeDelay = computed(() =>
    props.trigger === 'hover' ? props.hideTimeout : 0,
);

// 映射不同的触发方式（如 hover、click、contextmenu）到对应的事件处理函数
const triggerStrategyMap: Map<string, () => void> = new Map();
triggerStrategyMap.set('hover', () => {
    // 当 trigger 为 hover 时：将 mouseenter 事件绑定到 openFinal 函数，mouseleave 事件绑定到 closeFinal 函数。
    // 这样，当鼠标悬停或离开时，会分别触发 Tooltip 的显示和隐藏。
    events.value['mouseenter'] = openFinal;
    outerEvents.value['mouseleave'] = closeFinal;
    dropdownEvents.value['mouseenter'] = openFinal;
});
triggerStrategyMap.set('click', () => {
    events.value['click'] = togglePopper;
});
triggerStrategyMap.set('contextmenu', () => {
    events.value['contextmenu'] = (e) => {
        e.preventDefault();
        openFinal();
    };
});

// 延迟执行的显示和隐藏函数  用于存储经过防抖处理的显示和隐藏函数
let openDebounce: DebouncedFunc<() => void> | void;
let closeDebounce: DebouncedFunc<() => void> | void;

// 取消隐藏的防抖操作  最终显示 Tooltip
function openFinal() {
    closeDebounce?.cancel();
    openDebounce?.();
}
// 取消显示的防抖操作   最终隐藏 Tooltip
function closeFinal() {
    openDebounce?.cancel();
    closeDebounce?.();
}
// 根据当前 Tooltip 的可见性状态，调用 openFinal 或 closeFinal 来切换 Tooltip 的显示状态
function togglePopper() {
    visible.value ? closeFinal() : openFinal();
}

// 设置 Tooltip 可见性状态
function setVisible(val: boolean) {
    if (props.disabled) return;
    visible.value = val;
    emits('visible-change', val);
}

// 根据 trigger 属性值，从 triggerStrategyMap 中获取对应的事件处理策略并执行。
function attachEvents() {
    // 如果是禁用了或者是手动控制    那就直接返回
    if (props.disabled || props.manual) return;
    triggerStrategyMap.get(props.trigger)?.();
}

// 是 Popper.js 的实例
let popperInstance: null | Instance;
// 是用于销毁 Popper.js 实例的函数
function destroyPopperInstance() {
    popperInstance?.destroy();
    popperInstance = null;
}

// 用于重置事件处理函数并重新绑定
function resetEvents() {
    events.value = {};
    outerEvents.value = {};
    dropdownEvents.value = {};

    attachEvents();
}

if (!props.manual) {
    attachEvents();
}

const show: TooltipInstance['show'] = openFinal;
const hide: TooltipInstance['hide'] = function () {
    openDebounce?.cancel();
    setVisible(false);
};

// 用于检测点击是否发生在 Tooltip 容器外部
useClickOutside(containerNode, () => {
    emits('click-outside');
    if (props.trigger === 'hover' || props.manual) return;
    visible.value && closeFinal();
});

// 当 visible 这个响应式变量的值变化时（尤其是变为 true 时），创建一个 Popper.js 实例来定位 Tooltip
watch(
    visible,
    (val) => {
        if (!val) return;
        // 当 Tooltip 变为可见时    就创建 Popper.js 实例
        if (triggerNode.value && popperNode.value) {
            popperInstance = createPopper(
                triggerNode.value,
                popperNode.value,
                popperOptions.value,
            );
        }
    },
    { flush: 'post' },
);

watch(
    () => props.manual,
    (isManual) => {
        if (isManual) {
            events.value = {};
            outerEvents.value = {};
            dropdownEvents.value = {};
            return;
        }
        attachEvents();
    },
);

watch(
    () => props.trigger,
    (newTrigger, oldTrigger) => {
        if (newTrigger === oldTrigger) return;
        resetEvents();
    },
);

watch(
    () => props.disabled,
    (val, oldVal) => {
        if (val === oldVal) return;
        openDebounce?.cancel();
        visible.value = false;
        emits('visible-change', false);
        resetEvents();
    },
);

watchEffect(() => {
    openDebounce = debounce(bind(setVisible, null, true), openDelay.value);
    closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value);
});

// 取消防抖处理
useEvenstToTiggerNode(props, triggerNode, events, () => {
    openDebounce?.cancel();
    setVisible(false);
});

onUnmounted(() => {
    destroyPopperInstance();
});

// 外部组件可以直接调用 show 和 hide 来控制 Tooltip 的显示和隐藏
defineExpose<TooltipInstance>({
    show,
    hide,
});
</script>

<template>
    <div class="li-tooltip" ref="containerNode" v-on="outerEvents">
        <div
            class="li-tooltip__trigger"
            ref="_triggerNode"
            v-on="events"
            v-if="!virtualTriggering"
        >
            <slot></slot>
        </div>
        <slot name="default" v-else></slot>

        <transition :name="transition" @after-leave="destroyPopperInstance">
            <div
                class="li-tooltip__popper"
                ref="popperNode"
                v-on="dropdownEvents"
                v-if="visible"
            >
                <slot name="content">
                    {{ content }}
                </slot>
                <div id="arrow" data-popper-arrow></div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
@import './style.css';
</style>
