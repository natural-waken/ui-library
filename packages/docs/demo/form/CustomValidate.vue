<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { LiMessage, type FormInstance } from 'ui-library';

const formRef = ref<FormInstance>();
const form = reactive({
    name: '',
    password: '',
    passwordConfirm: '',
});

const rules: any = reactive({
    name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
    ],
    password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
    passwordConfirm: [
        {
            required: true,
            trigger: 'blur',
            message: '请再次输入密码',
        },
        {
            validator: (_: typeof rules, value: string) =>
                value === form.password,
            trigger: 'blur',
            message: '两个密码必须相同',
        },
    ],
});

const onSubmit = async (instance?: FormInstance) => {
    const valid = await instance?.validate();
    if (!valid) return;
    LiMessage.success('submit!');
};

const onReset = () => {
    formRef.value?.resetFields();
};
</script>

<template>
    <li-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.prevent="onSubmit(formRef)"
    >
        <li-form-item label="Activity name" prop="name">
            <li-input v-model="form.name" />
        </li-form-item>
        <li-form-item label="Password" prop="password">
            <li-input v-model="form.password" type="password" />
        </li-form-item>
        <li-form-item label="Password Confirm" prop="passwordConfirm">
            <li-input v-model="form.passwordConfirm" type="password" />
        </li-form-item>
        <li-form-item>
            <li-button type="primary" native-type="submit">Create</li-button>
            <li-button @click="onReset">Reset</li-button>
        </li-form-item>
    </li-form>
</template>
