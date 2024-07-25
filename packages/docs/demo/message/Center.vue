<script lang="ts" setup>
import { LiMessage } from 'ui-library';

const openCenter = () => {
    LiMessage({
        showClose: true,
        message: 'Centered text',
        center: true,
    });
};
</script>

<template>
    <li-button plain @click="openCenter">Centered text</li-button>
</template>
