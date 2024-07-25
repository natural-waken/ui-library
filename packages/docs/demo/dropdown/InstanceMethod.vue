<script setup lang="ts">
import type { DropdownItemProps, DropdownInstance } from 'ui-library';
import { ref } from 'vue';

const items: DropdownItemProps[] = [
    { command: '1', label: 'Action 1' },
    { command: '2', label: 'Action 2' },
    { command: '3', label: 'Action 3', disabled: true },
    { command: '4', label: 'Action 4', divided: true },
];
const dropdownRef = ref<DropdownInstance>();
</script>

<template>
    <li-button @click="() => dropdownRef?.open()">open</li-button>
    <li-button @click="() => dropdownRef?.close()">close</li-button>
    <br />
    <li-dropdown ref="dropdownRef" :items="items">
        <span class="dropdown-link">
            Dropdown List
            <li-icon icon="angle-down" />
        </span>
    </li-dropdown>
</template>

<style scoped>
.dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--li-color-primary);
    margin-top: 20px;
    i {
        margin-left: 8px;
    }
}
</style>
