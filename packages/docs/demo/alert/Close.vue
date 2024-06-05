<script setup>
import { LiMessage } from 'ui-library';

function handleClose() {
    LiMessage.info('close callback');
}
</script>
<template>
    <div class="basic block">
        <li-alert title="Unclosable alert" type="success" :closable="false" />
        <li-alert
            title="Alert with callback"
            type="warning"
            @close="handleClose"
        />
    </div>
</template>
