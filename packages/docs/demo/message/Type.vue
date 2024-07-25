<script lang="ts" setup>
import { LiMessage } from 'ui-library';

const open1 = () => {
    LiMessage('This is a message.');
};
const open2 = () => {
    LiMessage({
        message: 'Congrats, this is a success message.',
        type: 'success',
    });
};
const open3 = () => {
    LiMessage({
        message: 'Warning, this is a warning message.',
        type: 'warning',
    });
};
const open4 = () => {
    LiMessage.error('Oops, this is a error message.');
};
</script>

<template>
    <li-button :plain="true" @click="open2">Success</li-button>
    <li-button :plain="true" @click="open3">Warning</li-button>
    <li-button :plain="true" @click="open1">Message</li-button>
    <li-button :plain="true" @click="open4">Error</li-button>
</template>
