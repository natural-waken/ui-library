<!-- <script setup lang="ts">
import { LiPopconfirm } from 'ui-library';

function confirm() {
    console.log('confirm');
}

function cancel() {
    console.log('cancel');
}
</script>

<template>
    <li-button type="primary" size="small">hello</li-button>
    <li-button-group type="primary" size="small">
        <li-button>ok</li-button>
        <li-button>ok</li-button>
    </li-button-group>

    <br />
    <li-popconfirm title="确定删除吗" @confirm="confirm" @cancel="cancel">
        <li-button type="primary" size="small">test</li-button>
    </li-popconfirm>
</template>

<style scoped></style> -->

<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
    name: '',
    desc: '',
});
</script>

<template>
    <li-input v-model="form.name" show-password type="password"></li-input>
    <li-input v-model="form.desc" type="textarea"></li-input>
</template>
