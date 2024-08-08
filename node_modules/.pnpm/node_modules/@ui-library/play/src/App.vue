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
<script setup>
import { ref } from 'vue';

const options = ref([
    { value: 'beijing', label: 'Beijing' },
    { value: 'shanghai', label: 'Shanghai' },
    { value: 'xian', label: 'Xian', disabled: true },
    { value: 'shenzhen', label: 'Shenzhen' },
]);
const value = ref('');
</script>

<template>
    <li-select v-model="value" :options="options" filterable clearable />

    <li-select v-model="value" filterable clearable>
        <li-option value="beijing" label="Beijing"></li-option>
        <li-option value="shanghai" label="Shanghai"></li-option>
        <li-option value="xian" label="Xian" disabled></li-option>
        <li-option value="shenzhen" label="Shenzhen"></li-option>
    </li-select>
</template>

<style></style>
