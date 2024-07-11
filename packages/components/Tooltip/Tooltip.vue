<script setup lang="ts">
import { ref, watch, watchEffect, onUnmounted, computed, type Ref } from 'vue';
import { bind, debounce, isNil, type DebouncedFunc } from 'lodash-es'; // debounce 防抖
import { useClickOutside } from '@ui-library/hooks';
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types';
import { createPopper, type Instance } from '@popperjs/core';
import type { ButtonInstance } from '../Button';
import useEventsToTiggerNode from './useEventsToTiggerNode';

defineOptions({
    name: 'LiTooltip',
});

// 重新定义  专门添加到这个 Tooltip
interface _TooltipProps extends TooltipProps {
    virtualRef?: HTMLElement | ButtonInstance | void; // 虚拟触发结点
    virtualTriggering?: boolean; // 是否开启虚拟触发
}

const props = withDefaults(defineProps<_TooltipProps>(), {
    placement: 'bottom',
    trigger: 'hover',
    transition: 'fade',
    showTimeout: 0,
    hideTimeout: 200,
});
const emits = defineEmits<TooltipEmits>();
const visible = ref(false);

// 定义三个事件   就是三个事件的对象
const events: Ref<Record<string, EventListener>> = ref({});
const outerEvents: Ref<Record<string, EventListener>> = ref({});
const dropdownEvents: Ref<Record<string, EventListener>> = ref({});

// 三个容器 ref
const containerNode = ref<HTMLElement>();
const popperNode = ref<HTMLElement>();
const _triggerNode = ref<HTMLElement>();

const triggerNode = computed(() => {
    // 如果是虚拟触发  那我们就 return 个结点
    if (props.virtualTriggering)
        return (
            // @tips any 为了 fix 一个初始设计上的小失误 （后续重构 "虚拟目标节点" 时解决）
            ((props.virtualRef as ButtonInstance)?.ref as any) ??
            (props.virtualRef as HTMLElement) ??
            _triggerNode.value
        );

    // 不然就返回我们定义的  node
    return _triggerNode.value as HTMLElement;
});
// 这个是我们对于 popperJs 封装的些 options
const popperOptions = computed(() => ({
    placement: props.placement, // 方向
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 9],
            },
        },
    ],
    ...props.popperOptions,
}));

// 只有在 hover 时候生效
const openDelay = computed(() =>
    props.trigger === 'hover' ? props.showTimeout : 0,
);
const closeDelay = computed(() =>
    props.trigger === 'hover' ? props.hideTimeout : 0,
);

let openDebounce: DebouncedFunc<() => void> | void;
let closeDebounce: DebouncedFunc<() => void> | void;
function openFinal() {
    // 首先尝试取消关闭函数的延迟执行，然后执行打开函数的延迟执行
    closeDebounce?.cancel();
    openDebounce?.();
}
function closeFinal() {
    // 首先尝试取消打开函数的延迟执行，然后执行关闭函数的延迟执行
    openDebounce?.cancel();
    closeDebounce?.();
}

function togglePopper() {
    visible.value ? closeFinal() : openFinal();
}

function setVisible(val: boolean) {
    if (props.disabled) return;
    visible.value = val;
    emits('visible-change', val);
}

// 处理我们事件的三种情况  我们三种事件在不同容器上使用
function attachEvents() {
    if (props.disabled || props.manual) return;
    if (props.trigger === 'hover') {
        events.value['mouseenter'] = openFinal;
        outerEvents.value['mouseleave'] = closeFinal;
        dropdownEvents.value['mouseenter'] = openFinal;
        return;
    }
    if (props.trigger === 'click') {
        events.value['click'] = togglePopper;
    }
    if (props.trigger === 'contextmenu') {
        events.value['contextmenu'] = (e) => {
            e.preventDefault();
            openFinal();
        };
    }
}

// 下面就是对我们 popperJs 的封装
let popperInstance: null | Instance;
// 定义个对我们 popperJs 实例删除的方法
function destroyPopperInstance() {
    if (isNil(popperInstance)) return;
    popperInstance?.destroy();
    popperInstance = null;
}

function resetEvents() {
    events.value = {};
    outerEvents.value = {};
    dropdownEvents.value = {};

    attachEvents();
}

const show: TooltipInstance['show'] = openFinal;
const hide: TooltipInstance['hide'] = function () {
    openDebounce?.cancel();
    setVisible(false);
};

// 我们在容器结点外部做点击时候    触发这个事件
useClickOutside(containerNode, () => {
    emits('click-outside');
    if (props.trigger === 'hover' || props.manual) return;

    // 否则 visible 为 true    那我们就 close
    visible.value && closeFinal();
});

// 对虚拟结点处理行为
useEventsToTiggerNode(props, triggerNode, events, () => {
    openDebounce?.cancel();
    setVisible(false);
});

// 接下来就是对其他参数的监听
watch(
    visible,
    (val) => {
        if (!val) return;

        if (triggerNode.value && popperNode.value) {
            // 调用 popper 传入两个节点和配置选项
            popperInstance = createPopper(
                triggerNode.value,
                popperNode.value,
                popperOptions.value,
            );
        }
    },
    { flush: 'post' },
);

// 对手动模式的监听
watch(
    () => props.manual,
    (isManual) => {
        if (isManual) {
            resetEvents();
            return;
        }
        attachEvents();
    },
);

// 对 trigger 监听
// watch(
//     () => props.trigger,
//     (newTrigger, oldTrigger) => {
//         if (newTrigger === oldTrigger) return;
//         resetEvents();
//     },
// );

watch(
    () => props.trigger,
    (val, oldVal) => {
        if (val === oldVal) return;
        openDebounce?.cancel();
        visible.value = false;
        emits('visible-change', false);
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
    if (!props.manual) {
        // 初次加载的时候 不是手动的就
        attachEvents();
    }
    openDebounce = debounce(bind(setVisible, null, true), openDelay.value);
    closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value);
});

defineExpose<TooltipInstance>({
    show,
    hide,
});

onUnmounted(() => {
    destroyPopperInstance();
});
</script>

<template>
    <div class="li-tooltip" ref="containerNode" v-on="outerEvents">
        <!-- 加个 v-if    就是不是我们的虚拟触发 -->
        <div
            class="li-tooltip__trigger"
            ref="_triggerNode"
            v-on="events"
            v-if="!virtualTriggering"
        >
            <slot></slot>
        </div>
        <!-- 虚拟触发打开之后  默认插槽 -->
        <slot name="default" v-else></slot>

        <transition :name="transition" @aftli-leave="destroyPopperInstance">
            <div
                class="li-tooltip__popper"
                ref="popperNode"
                v-on="dropdownEvents"
                v-if="visible"
            >
                <slot name="content">
                    {{ content }}
                </slot>
                <div id="arrow" data-poppli-arrow></div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
@import './style.css';
</style>
