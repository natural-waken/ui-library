<script lang="ts" setup>
import { h } from 'vue';
import { LiMessage } from 'ui-library';

const open = () => {
    LiMessage('This is a message.');
};

const openVn = () => {
    LiMessage({
        message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
            h('span', null, 'Message can be '),
            h('i', { style: 'color: teal' }, 'VNode'),
        ]),
    });
};
</script>

<template>
    <li-button :plain="true" @click="open">Show message</li-button>
    <li-button :plain="true" @click="openVn">VNode</li-button>
</template>
