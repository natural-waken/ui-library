<script setup lang="ts">
import { LiMessageBox, LiMessage } from 'ui-library';

function openAlert() {
    LiMessageBox.alert('This is a message', 'Title')
        .then((action) => {
            LiMessage.info(`action: ${action}`);
        })
        .catch((action) => {
            LiMessage.warning(`action: ${action}`);
        });
}
</script>

<template>
    <li-button @click="openAlert" plain> Click to open the Alert</li-button>
</template>
