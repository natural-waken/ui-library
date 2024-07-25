<script setup lang="ts">
import { type DropdownItemProps, LiMessage } from 'ui-library';

const items: DropdownItemProps[] = [
    { command: '1', label: 'Action 1' },
    { command: '2', label: 'Action 2' },
    { command: '3', label: 'Action 3', disabled: true },
    { command: '4', label: 'Action 4', divided: true },
];

function handleClick() {
    LiMessage.info('button click');
}
</script>

<template>
    <div class="row">
        <li-dropdown :items="items">
            <li-button type="primary">
                Dropdown List
                <li-icon icon="angle-down" style="margin-left: 8px" />
            </li-button>
        </li-dropdown>
        <li-dropdown
            :items="items"
            type="primary"
            @click="handleClick"
            split-button
        >
            Dropdown List
        </li-dropdown>
    </div>
</template>

<style scoped>
.row div {
    margin-right: 16px;
}
</style>
