<script setup lang="ts">
import type { CollapseItemProps } from './types';
import { inject, computed } from 'vue';
import { COLLAPSE_CTX_KEY } from './constants';
import LiIcon from '../Icon/Icon.vue';
import transitionEvents from './transitionEvent';

defineOptions({
    name: 'LiCollapseItem',
});
const props = defineProps<CollapseItemProps>();
const ctx = inject(COLLAPSE_CTX_KEY, void 0);
const isActive = computed(() => ctx?.activeNames.value?.includes(props.name));

function handleClick() {
    if (props.disabled) return;
    ctx?.handleItemClick(props.name); // name 必传且只传一个
}
</script>

<template>
    <div
        class="li-collapse-item"
        :class="{
            'is-disabled': disabled,
        }"
    >
        <!-- header -->
        <div
            class="li-collapse-item__header"
            :id="`item-header-${name}`"
            :class="{
                'is-disabled': disabled,
                'is-active': isActive,
            }"
            @click="handleClick"
        >
            <span class="li-collapse-item__title">
                <slot name="title">
                    {{ title }}
                </slot>
            </span>
            <li-icon icon="angle-right" class="header-angle" />
        </div>

        <!-- wrapper -->
        <transition name="slide" v-on="transitionEvents">
            <div class="li-collapse-item__wapper" v-show="isActive">
                <div
                    class="li-collapse-item__content"
                    :id="`item-content-${name}`"
                >
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
@import './style.css';
</style>
