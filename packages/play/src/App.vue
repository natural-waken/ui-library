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
<script setup lang="ts">
import { LiMessageBox, LiMessage } from 'ui-library';

function openConfirm() {
    LiMessageBox.confirm(
        'proxy will permanently delete the file. Continue?',
        'Warning',
        { type: 'warning' },
    )
        .then((action) => {
            LiMessage.info(`action: ${action}`);
        })
        .catch((action) => {
            LiMessage.warning(`action: ${action}`);
        });
}
</script>

<template>
    <li-button @click="openConfirm" plain> Click to open the Confirm</li-button>
</template>
