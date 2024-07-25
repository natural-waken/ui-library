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
