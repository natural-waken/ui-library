<script setup lang="ts">
import type { LoadingOptions } from './types';
import { computed, type Ref } from 'vue';
import { isString } from 'lodash-es';
import LiIcon from '../Icon/Icon.vue';

defineOptions({
    name: 'LiLoading',
    inheritAttrs: false,
});
const props = defineProps<LoadingOptions>();

// 加载中的雪花图标
const iconName = computed(() => {
    if (isString(props.spinner)) {
        return props.spinner;
    }
    return 'spinner'; // 'circle-notch'(圆圈 icon) 也很好看
});
</script>

<template>
    <transition name="fade-in-linear" @after-leave="onAfterLeave">
        <!-- 遮罩层 -->
        <div
            v-show="(props.visible as Ref).value"
            class="li-loading li-loading__mask"
            :class="{ 'is-fullscreen': fullscreen }"
        >
            <div class="li-loading__spinner">
                <!-- 加载图标 -->
                <li-icon v-if="props.spinner !== false" :icon="iconName" spin />
                <p v-if="text" class="li-loading-text">{{ text }}</p>
            </div>
        </div>
    </transition>
</template>

<style>
@import './style.css';

/* 我们样式中的 background 和 zIndex 都是动态    props 中传进来 */
.li-loading {
    --li-loading-bg-color: v-bind(background) !important;
    --li-loading-z-index: v-bind(zIndex) !important;
}
</style>
