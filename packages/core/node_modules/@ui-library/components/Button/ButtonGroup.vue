<script setup lang="ts">
import type { ButtonGroupProps } from './types';
import { provide, reactive, toRef } from 'vue';
import { BUTTON_GROUP_CTX_KEY } from './constants';

defineOptions({
    name: 'LiButtonGroup',
});
const props = defineProps<ButtonGroupProps>();

provide(
    BUTTON_GROUP_CTX_KEY,
    reactive({
        size: toRef(props, 'size'),
        type: toRef(props, 'type'),
        disabled: toRef(props, 'disabled'),
    }),
); // 将 BUTTON_GROUP_CTX_KEY 和 reactive 对象传递给子组件
</script>

<template>
    <div class="li-button-group">
        <slot></slot>
    </div>
</template>

<style scoped>
@import './style.css';
</style>
