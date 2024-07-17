<script setup lang="ts">
import type { ConfigProviderProps } from './types';
import { provideGlobalConfig } from './hooks';

defineOptions({
    name: 'LiConfigProvider',
});

const props = defineProps<ConfigProviderProps>();
// 调用 provideGlobalConfig 函数，并传入组件的属性 props，返回一个 config 对象
const config = provideGlobalConfig(props);
</script>

<template>
    <slot name="default" :config="config"></slot>
</template>
