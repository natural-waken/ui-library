<script setup lang="ts">
import type { NotificationProps, NotificationCompInstance } from './types';
import { computed, onMounted, ref } from 'vue';
import { getLastBottomOffset } from './methods';
import { delay, bind } from 'lodash-es';
import { useOffset } from '@ui-library/hooks';
import { addUnit } from '@ui-library/utils';
import { typeIconMap, RenderVnode } from '@ui-library/utils';
import LiIcon from '../Icon/Icon.vue';

defineOptions({ name: 'LiNotification' });

const props = withDefaults(defineProps<NotificationProps>(), {
    type: 'info',
    duration: 3000,
    offset: 20,
    position: 'top-right',
    transitionName: 'fade',
    showClose: true,
});

// 控制通知的可见性
const visible = ref(false);
const notifyRef = ref<HTMLDivElement>();
// div 高度   存储通知框的高度   是实时计算的
const boxHeight = ref(0);
// 使用 useOffset 来计算通知框的顶部和底部偏移量
// offset  通知框的偏移量  是我们 props 里面的值
const { topOffset, bottomOffset } = useOffset({
    getLastBottomOffset: bind(getLastBottomOffset, props),
    offset: props.offset,
    boxHeight,
});

// 根据通知类型获取对应的图标名称
const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info');
// 根据什么结尾就显示什么类名的样式
const horizontalClass = computed(() =>
    props.position.endsWith('right') ? 'right' : 'left',
);
// 动态设置通知的垂直位置属性名
const verticalProperty = computed(() =>
    props.position.startsWith('top') ? 'top' : 'bottom',
);
// 看是 top 还是 bottomOffset
// 这样样式就可以根据我们创建的 position 改变了
const customStyle = computed(() => ({
    [verticalProperty.value]: addUnit(topOffset.value),
    zIndex: props.zIndex,
}));

// 通知展示开始结束时间  为 duration 服务
// 定义一个计时器变量，用于控制通知的显示时长
let timer: number;
function startTimmer() {
    if (props.duration === 0) return;
    timer = delay(close, props.duration);
}
function clearTimer() {
    clearTimeout(timer);
}

// 关闭通知
function close() {
    visible.value = false;
}

// 在组件挂载时，设置通知为可见并启动计时器
onMounted(() => {
    visible.value = true;
    startTimmer();
});
defineExpose<NotificationCompInstance>({
    bottomOffset,
    close,
});
</script>

<template>
    <transition
        :name="`li-notification-${transitionName}`"
        @after-leave="!visible && onDestory()"
        @enter="boxHeight = notifyRef!.getBoundingClientRect().height"
    >
        <div
            ref="notifyRef"
            class="li-notification"
            :class="{
                [`li-notification--${type}`]: type,
                [horizontalClass]: true,
                'show-close': showClose,
            }"
            :style="customStyle"
            v-show="visible"
            role="alert"
            @click="onClick"
            @mouseenter="clearTimer"
            @mouseleave="startTimmer"
        >
            <li-icon
                v-if="iconName"
                :icon="iconName"
                class="li-notification__icon"
            />

            <div class="li-notification__text">
                <div class="li-notification__title">{{ title }}</div>
                <div class="li-notification__content">
                    <slot>
                        <render-vnode v-if="message" :vNode="message" />
                    </slot>
                </div>
            </div>
            <div class="li-notification__close" v-if="showClose">
                <li-icon icon="xmark" @click.stop="close" />
            </div>
        </div>
    </transition>
</template>

<style>
@import './style.css';
</style>
