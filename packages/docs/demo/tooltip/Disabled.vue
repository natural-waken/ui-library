<script lang="ts" setup>
import { ref } from 'vue';

const disabled = ref(false);
</script>

<template>
    <li-tooltip
        :disabled="disabled"
        content="click to close tooltip function"
        placement="bottom"
    >
        <li-button @click="disabled = !disabled"
            >click to {{ disabled ? 'active' : 'close' }} tooltip
            function</li-button
        >
    </li-tooltip>
</template>
