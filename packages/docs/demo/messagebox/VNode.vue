<script setup lang="ts">
import { h, ref } from 'vue';
import { LiMessageBox, LiSwitch, type SwitchValueType } from 'ui-library';

function open1() {
    LiMessageBox({
        title: 'Message',
        message: h('p', null, [
            h('span', null, 'Message can be '),
            h('i', { style: 'color: teal' }, 'VNode'),
        ]),
    });
}

function open2() {
    const checked = ref<SwitchValueType>(false);
    LiMessageBox({
        title: 'Message',
        message: () =>
            h(LiSwitch, {
                modelValue: checked.value,
                'onUpdate:modelValue': (val: SwitchValueType) => {
                    checked.value = val;
                },
            }),
    });
}
</script>

<template>
    <li-button @click="open1" plain>Common VNode</li-button>
    <li-button @click="open2" plain>Dynamic props</li-button>
    <li-button plain>Common VNode</li-button>
    <li-button plain>Dynamic props</li-button>
</template>
