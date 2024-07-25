<!-- <script setup lang="ts">
import { LiPopconfirm } from 'ui-library';

function confirm() {
    console.log('confirm');
}

function cancel() {
    console.log('cancel');
}
</script>

<template>
    <li-button type="primary" size="small">hello</li-button>
    <li-button-group type="primary" size="small">
        <li-button>ok</li-button>
        <li-button>ok</li-button>
    </li-button-group>

    <br />
    <li-popconfirm title="确定删除吗" @confirm="confirm" @cancel="cancel">
        <li-button type="primary" size="small">test</li-button>
    </li-popconfirm>
</template>

<style scoped></style> -->
<script setup>
import { ref } from 'vue';
import { LiLoading } from 'ui-library';

const loading = ref(false);

function openLoading1() {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000);
}

function openLoading2() {
    const _loading = LiLoading.service({
        lock: true,
        spinner: 'circle-notch',
        text: '加载中...',
        background: 'rgba(255,255,255,0.5)',
    });
    setTimeout(() => {
        _loading.close();
    }, 2000);
}
</script>

<template>
    <li-button
        v-loading.fullscreen.lock="loading"
        type="primary"
        @click="openLoading1"
    >
        As a directive
    </li-button>
    <li-button type="primary" @click="openLoading2"> As a service </li-button>
</template>
