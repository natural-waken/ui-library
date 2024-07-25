<script lang="ts" setup>
import { LiNotification } from 'ui-library';

const open = () => {
    LiNotification.success({
        title: 'Info',
        message: 'This is a message without close button',
        showClose: false,
    });
};
</script>

<template>
    <li-button plain @click="open"> Hide close button </li-button>
</template>
