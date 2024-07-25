<script lang="ts" setup>
import { LiMessage } from 'ui-library';

const open1 = () => {
    LiMessage({
        message: 'Congrats, this is a success message.',
        type: 'success',
    });
};
const open2 = () => {
    LiMessage.success('Congrats, this is a success message.');
};
</script>
<template>
    <div>
        <li-button @click="open1">插件式调用</li-button>
        <li-button @click="open2">函数式调用</li-button>
        <li-button
            @click="$message.success('Congrats, this is a success message.')"
            >全局方法调用</li-button
        >
    </div>
</template>
