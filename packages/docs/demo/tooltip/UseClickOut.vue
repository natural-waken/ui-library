<template>
    <li-tooltip
        :disabled="disabled"
        content="Click outside to close this tooltip"
        placement="bottom"
        @click-outside="handleClickOutside"
    >
        <li-button @click="toggleTooltip">
            Click me to toggle tooltip
        </li-button>
    </li-tooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const disabled = ref(false);
const visible = ref(false);

function toggleTooltip() {
    visible.value = !visible.value;
}

function handleClickOutside() {
    // 处理点击外部事件
    visible.value = false;
}
</script>

<style scoped>
/* 样式定义 */
</style>
