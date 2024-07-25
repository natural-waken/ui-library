<script setup lang="ts">
import { LiMessageBox, LiMessage } from 'ui-library';

function openConfirm() {
    LiMessageBox.prompt('Place input your name', 'Tip', { type: 'info' })
        .then(({ value }) => {
            LiMessage.info(`your name is: ${value}`);
        })
        .catch((action) => {
            LiMessage.warning(`action: ${action}`);
        });
}
</script>

<template>
    <li-button @click="openConfirm" plain> Click to open the Confirm</li-button>
</template>
