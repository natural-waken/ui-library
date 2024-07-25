<script lang="ts" setup>
import { LiNotification } from 'ui-library';

const open1 = () => {
    LiNotification({
        title: 'Success',
        message: 'This is a success message',
        type: 'success',
    });
};

const open2 = () => {
    LiNotification({
        title: 'Warning',
        message: 'This is a warning message',
        type: 'warning',
    });
};

const open3 = () => {
    LiNotification({
        title: 'Info',
        message: 'This is an info message',
        type: 'info',
    });
};

const open4 = () => {
    LiNotification({
        title: 'Error',
        message: 'This is an error message',
        type: 'danger',
    });
};
</script>

<template>
    <li-button plain @click="open1"> Success </li-button>
    <li-button plain @click="open2"> Warning </li-button>
    <li-button plain @click="open3"> Info </li-button>
    <li-button plain @click="open4"> Error </li-button>
</template>
