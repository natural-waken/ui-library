<script setup lang="ts">
import type { IconProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // 图标组件
import { omit } from 'lodash-es'; // filterProps 需要用到 lodash 函数  用于从对象中排除指定的键
import { computed } from 'vue';

defineOptions({
    name: 'LiIcon',
    inheritAttrs: false, // 关闭属性的透传，即父组件传递给子组件的属性不会被自动应用到子组件的根元素上
});

const props = defineProps<IconProps>(); // 类型由 IconProps 提供
const filterProps = computed(() => omit(props, ['type', 'color'])); // 从我们传进来的 props 中去除 type color, 因为 type color 是我们自己定义的  我们自己绑定上去
// 自定义样式
const customStyles = computed(() => ({ color: props.color ?? void 0 })); // 根据 props.color 的值动态生成一个样式对象
</script>

<template>
    <!-- v-bind="$attrs" 将父组件传递给 LiIcon 组件的所有属性（除了 props 中定义的）绑定到 <i> 标签上 -->
    <i
        class="li-icon"
        :class="[`li-icon-${props.type}`]"
        :style="customStyles"
        v-bind="$attrs"
    >
        <font-awesome-icon v-bind="filterProps"></font-awesome-icon>
    </i>
</template>

<style lang="scss" scoped>
.li-icon {
    --li-icon-color: inherit;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    fill: currentColor;
    color: var(--li-icon-color);
    font-size: inherit;
}

@each $val in primary, info, success, warning, danger {
    .li-icon--#{$val} {
        --li-icon-color: var(--li-color-#{$val});
    }
}
</style>
