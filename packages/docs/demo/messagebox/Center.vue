<script setup lang="ts">
import { LiMessage, LiMessageBox } from 'ui-library';

function openMsgBox() {
    LiMessageBox.confirm(
        'proxy will permanently delete the file. Continue?',
        'Warning',
        {
            type: 'warning',
            center: true,
            // 这里展示一下 不用 Promise 写法的时候
            callback(action) {
                if (action === 'confirm') {
                    LiMessage.info(action);
                } else {
                    LiMessage.warning(action as string);
                }
            },
        },
    );
}
</script>

<template>
    <li-button @click="openMsgBox" plain>Click to open Message Box</li-button>
</template>
