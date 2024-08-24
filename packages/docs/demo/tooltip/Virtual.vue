<template>
    <div class="tooltip-demo">
        <li-tooltip
            v-if="showVirtualTooltip"
            content="Virtual Node Tooltip"
            placement="right"
            :virtualRef="virtualElement"
            :virtualTriggering="true"
        >
            <!-- 虚拟触发模式下无内容 -->
        </li-tooltip>

        <li-button @click="triggerVirtualTooltip">
            Trigger Virtual Tooltip
        </li-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showVirtualTooltip = ref(true);
const virtualElement = ref<HTMLElement | null>(null);

function triggerVirtualTooltip() {
    if (!virtualElement.value) {
        virtualElement.value = document.createElement('div');
        virtualElement.value.style.position = 'absolute';
        virtualElement.value.style.top = '100px'; // 确保位置在视图中
        virtualElement.value.style.left = '100px';
        virtualElement.value.style.backgroundColor = 'red'; // Debug style
        virtualElement.value.style.width = '100px';
        virtualElement.value.style.height = '100px';
        document.body.appendChild(virtualElement.value);
    }

    showVirtualTooltip.value = true;
}
</script>

<style>
.tooltip-demo {
    padding: 20px;
}
</style>
