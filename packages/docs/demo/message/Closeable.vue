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
