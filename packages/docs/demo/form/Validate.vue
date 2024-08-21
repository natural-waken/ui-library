<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { LiMessage, type FormInstance } from 'ui-library';

const formRef = ref<FormInstance>();
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

const rules = reactive({
    name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
    ],
    region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
    desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
});

const onSubmit = () => {
    formRef.value?.validate().then((valid) => {
        if (valid) {
            LiMessage.success('submit!');
        }
    });
};

const onReset = () => {
    formRef.value?.resetFields();
};
</script>

<template>
    <li-form ref="formRef" :model="form" :rules="rules">
        <li-form-item label="Activity name" prop="name">
            <li-input v-model="form.name" />
        </li-form-item>
        <li-form-item label="Activity zone" prop="region">
            <li-select
                v-model="form.region"
                placeholder="please select your zone"
                :options="options"
            />
        </li-form-item>
        <li-form-item label="Instant delivery" prop="delivery">
            <li-switch v-model="form.delivery" />
        </li-form-item>
        <li-form-item label="Activity form" prop="desc">
            <li-input v-model="form.desc" type="textarea" />
        </li-form-item>
        <li-form-item>
            <li-button type="primary" @click="onSubmit">Create</li-button>
            <li-button @click="onReset">Reset</li-button>
        </li-form-item>
    </li-form>
</template>
