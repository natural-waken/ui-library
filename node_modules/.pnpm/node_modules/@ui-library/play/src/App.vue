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
<script lang="ts" setup>
import { LiMessage } from 'ui-library';

const open1 = () => {
    LiMessage({
        showClose: true,
        message: 'This is a message.',
    });
};
const open2 = () => {
    LiMessage({
        showClose: true,
        message: 'Congrats, this is a success message.',
        type: 'success',
    });
};
const open3 = () => {
    LiMessage({
        showClose: true,
        message: 'Warning, this is a warning message.',
        type: 'warning',
    });
};
const open4 = () => {
    LiMessage({
        showClose: true,
        message: 'Oops, this is a error message.',
        type: 'danger',
    });
};
</script>

<template>
    <li-button :plain="true" @click="open1">Message</li-button>
    <li-button :plain="true" @click="open2">Success</li-button>
    <li-button :plain="true" @click="open3">Warning</li-button>
    <li-button :plain="true" @click="open4">Error</li-button>
</template>
