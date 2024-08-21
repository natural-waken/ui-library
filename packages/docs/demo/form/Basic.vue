<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { LiMessage } from 'ui-library';

const form = reactive({
    name: '',
    region: '',
    delivery: false,
    desc: '',
});

const options = ref([
    { value: 'beijing', label: 'Zone One' },
    { value: 'shanghai', label: 'Zone Two' },
]);

const onSubmit = () => {
    LiMessage.success('submit!');
};
</script>

<template>
    <li-form :model="form">
        <li-form-item label="Activity name">
            <li-input v-model="form.name" />
        </li-form-item>
        <li-form-item label="Activity zone">
            <li-select
                v-model="form.region"
                placeholder="please select your zone"
                :options="options"
            />
        </li-form-item>
        <li-form-item label="Instant delivery">
            <li-switch v-model="form.delivery" />
        </li-form-item>
        <li-form-item label="Activity form">
            <li-input v-model="form.desc" type="textarea" />
        </li-form-item>
        <li-form-item>
            <li-button type="primary" @click="onSubmit">Create</li-button>
            <li-button>Cancel</li-button>
        </li-form-item>
    </li-form>
</template>
