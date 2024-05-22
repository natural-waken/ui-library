<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types.ts';
import { throttle } from 'lodash-es'; // 引入节流代码
import { LiIcon } from 'ui-library';
import { BUTTON_GROUP_CTX_KEY } from './constants';

// 设置组件的选项
defineOptions({
    name: 'LiButton',
});

// props 就是接收我们使用 <li-button>  时候传入的属性  type="..."
// 使用 withDefaults 设置属性的默认值
const props = withDefaults(defineProps<ButtonProps>(), {
    tag: 'button',
    nativeType: 'button',
    // 用于节流的
    useThrottle: true,
    throttleDuration: 500, // 节流的间隔
});

// 定义组件的事件类型
const emits = defineEmits<ButtonEmits>();

// 定义组件的插槽
const slots = defineSlots();

// 引用按钮的 DOM 元素
const _ref = ref<HTMLButtonElement>();
const iconStyle = computed(() => ({
    marginRight: slots.default ? '6px' : '0px',
})); // 服务于单个图标的圆形组件

// 点击事件监听   再写个节流版本
const handleBtnClick = (e: MouseEvent) => emits('click', e);
const handleBtnClickThrottle = throttle(
    handleBtnClick,
    props.throttleDuration, // 节流的时间间隔
    { trailing: false }, // 只有在节流时间间隔的开始时调用函数
);

// 将 ButtonInstance 接口暴露给外部组件
defineExpose<ButtonInstance>({
    ref: _ref,
});

// group
// 当 LiButton 组件作为 LiButtonGroup 的子组件时，它会使用 LiButtonGroup 提供的属性，否则会使用自身的属性
const ctx = inject(BUTTON_GROUP_CTX_KEY, void 0); // 右边默认值 0
const size = computed(() => ctx?.size ?? props?.size ?? '');
const type = computed(() => ctx?.type ?? props?.type ?? '');
const disabled = computed(() => ctx?.disabled || props?.disabled || false);
</script>

<template>
    <component
        :is="tag"
        ref="_ref"
        class="li-button"
        :autofocus="autofocus"
        :type="tag === 'button' ? nativeType : void 0"
        :disabled="disabled || loading ? true : void 0"
        :class="{
            [`li-button--${type}`]: type,
            [`li-button--${size}`]: size,
            'is-plain': plain,
            'is-round': round,
            'is-circle': circle,
            'is-disabled': disabled,
            'is-loading': loading,
        }"
        @click="
            (e: MouseEvent) =>
                useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)
        "
    >
        <!-- props.loading 加载效果 -->
        <template v-if="loading">
            <!-- 具名插槽传进来 -->
            <slot name="loading">
                <li-icon
                    class="loading-icon"
                    :icon="loadingIcon ?? 'spinner'"
                    :style="iconStyle"
                    size="1x"
                    spin
                ></li-icon>
            </slot>
        </template>

        <!-- icon -->
        <!-- 当 loading 为 true 时候  我们这个 icon 需要给 loading 让位置 -->
        <li-icon
            v-if="icon && !loading"
            :icon="icon"
            :style="iconStyle"
            size="1x"
        ></li-icon>
        <slot></slot>
    </component>
</template>

<style scoped>
@import './style.css';
</style>
