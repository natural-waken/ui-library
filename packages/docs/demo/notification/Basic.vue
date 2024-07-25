<script setup lang="ts">
import { h } from 'vue';
import { LiNotification } from 'ui-library';

function openNotify1() {
    LiNotification({
        title: 'Title',
        message: h('i', { style: 'color:teal' }, 'This is a remider'),
    });
}

function openNotify2() {
    LiNotification({
        title: 'Prompt',
        message: 'This is a message that does not auto close',
        duration: 0,
    });
}
</script>

<template>
    <li-button @click="openNotify1" plain>Closes automatically</li-button>
    <li-button @click="openNotify2" plain>Won't closes automatically</li-button>
</template>
