<script setup lang="ts">
import type { MessageProps, MessageCompInstance } from './types';
import { computed, onMounted, ref, watch } from 'vue';
import { getLastBottomOffset } from './methods';
import { delay, bind } from 'lodash-es';
import { useOffset, useEventListener } from '@ui-library/hooks';
import { addUnit } from '@ui-library/utils';
import { typeIconMap, RenderVnode } from '@ui-library/utils';
import LiIcon from '../Icon/Icon.vue';

defineOptions({ name: 'LiMessage' });

const props = withDefaults(defineProps<MessageProps>(), {
    type: 'info',
    duration: 3000,
    offset: 10,
    transitionName: 'fade-up',
});

// 控制消息的可见性
const visible = ref(false);
const messageRef = ref<HTMLDivElement>();
// div 高度 存储消息框的高度   是实时计算的
const boxHeight = ref(0);
// 使用 useOffset 来计算消息框的顶部和底部偏移量
// bind 将 getLastBottomOffset 函数的 this 绑定到 props 对象。
// 当 getLastBottomOffset 被调用时，它的 this 指向 props，这允许 getLastBottomOffset 访问 props 中的属性
// offset  消息框的偏移量  是我们 props 里面的值
// boxHeight  消息框的高度
const { topOffset, bottomOffset } = useOffset({
    getLastBottomOffset: bind(getLastBottomOffset, props),
    offset: props.offset,
    boxHeight,
});

// 根据消息类型获取对应的图标名称
const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info');
// 自定义样式，主要是计算上边距和 z-index    绑定到下面消息框中
const customStyle = computed(() => ({
    top: addUnit(topOffset.value),
    zIndex: props.zIndex,
}));

// 消息展示开始结束时间  为 duration 服务
// 定义一个计时器变量，用于控制消息的显示时长
let timer: number;
function startTimmer() {
    if (props.duration === 0) return;
    timer = delay(close, props.duration);
}

function clearTimer() {
    clearTimeout(timer);
}

// 关闭消息
function close() {
    visible.value = false;
}

// 监听消息的可见性变化，当消息不可见时，更新 boxHeight 值，使得退出动画更加流畅
watch(visible, (val) => {
    if (!val) boxHeight.value = -props.offset; // 使得退出的动画更加流畅
});

// 按键盘上 esc  会执行 close 功能
// 监听键盘事件，当按下 'Escape' 键时关闭消息
useEventListener(document, 'keydown', (e: Event) => {
    const { code } = e as KeyboardEvent;
    if (code === 'Escape') close();
});

// 在组件挂载时，设置消息为可见并启动计时器
onMounted(() => {
    visible.value = true;
    startTimmer();
});

// 定义组件暴露的接口，包括 bottomOffset 和 close 方法
defineExpose<MessageCompInstance>({
    bottomOffset,
    close,
});
</script>

<template>
    <Transition
        :name="transitionName"
        @enter="boxHeight = messageRef!.getBoundingClientRect().height"
        @after-leave="!visible && onDestory()"
    >
        <div
            ref="messageRef"
            class="li-message"
            :class="{
                [`li-message--${type}`]: type,
                'is-close': showClose,
                'text-center': center,
            }"
            :style="customStyle"
            v-show="visible"
            role="alert"
            @mouseenter="clearTimer"
            @mouseleave="startTimmer"
        >
            <li-icon class="li-message__icon" :icon="iconName" />
            <div class="li-message__content">
                <slot>
                    <render-vnode v-if="message" :vNode="message" />
                </slot>
            </div>
            <div class="li-message__close" v-if="showClose">
                <li-icon icon="xmark" @click.stop="close" />
            </div>
        </div>
    </Transition>
</template>

<style>
@import './style.css';
</style>
