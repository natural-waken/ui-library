<script setup lang="ts">
import { inject, computed } from 'vue';
import { DROPDOWN_CTX_KEY } from './constants';
import { useId } from '@ui-library/hooks'; // 这个是生成每个 item 的唯一 id

import type { DropdownItemProps } from './types';

defineOptions({
    name: 'LiDropdownItem',
});

const props = withDefaults(defineProps<DropdownItemProps>(), {
    disabled: false,
    divided: false,
    command: useId().value,
});

// 注入 DROPDOWN_CTX_KEY 上下文
const ctx = inject(DROPDOWN_CTX_KEY);
const size = computed(() => ctx?.size.value); // 每个项大小

// 当组件被点击时，如果 props.disabled 为 true，则直接返回，不执行点击处理。
// 如果没有禁用，则调用上下文中的 handleItemClick 方法，并传递当前的 props
function handleClick() {
    if (props.disabled) return;
    ctx?.handleItemClick(props);
}
</script>


<template>
    <!-- 在 divided 为 true 时渲染，用作分隔符 -->
    <li v-if="divided" role="separator" class="divided-placeholder"></li>
    <li
        :id="`dropdown-item-${command ?? useId().value}`"
        :class="{
            'li-dropdown__item': true,
            ['li-dropdown__item--' + size]: size,
            'is-disabled': disabled,
            'is-divided': divided,
        }"
        @click="handleClick"
    >
        <slot>
            {{ label }}
        </slot>
    </li>
</template>

<style scoped>
@import './style.css';
</style>
