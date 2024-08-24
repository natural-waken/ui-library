<script setup>
import { LiMessage } from 'ui-library';
function handleBtnClick() {
    LiMessage.info('btn click');
}
</script>

<template>
    <p>
        <li-button @click="handleBtnClick"> with throttle</li-button>
        <li-button :use-throttle="false" @click="handleBtnClick"
            >without throttle</li-button
        >
    </p>
</template>
