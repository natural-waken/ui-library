<script setup lang="ts">
import type { AlertProps, AlertEmits, AlertInstance } from './types';
import { ref, computed } from 'vue';
import { typeIconMap } from '@ui-library/utils';
import LiIcon from '../Icon/Icon.vue';

defineOptions({
    name: 'LiAlert',
});

const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info');
const withDescription = computed(() => props.description || slots.default);
const props = withDefaults(defineProps<AlertProps>(), {
    effect: 'light',
    type: 'info',
    closable: true,
});
const emits = defineEmits<AlertEmits>();
const slots = defineSlots();

const visible = ref(true);
function close() {
    visible.value = false;
    emits('close');
}

function open() {
    visible.value = true;
}

defineExpose<AlertInstance>({
    open,
    close,
});
</script>

<template>
    <!-- 包在个动画里面 -->
    <transition name="li-alert-fade">
        <div
            v-show="visible"
            class="li-alert"
            role="alert"
            :class="{
                [`li-alert__${type}`]: type,
                [`li-alert__${effect}`]: effect,
                'text-center': center,
            }"
        >
            <li-icon
                v-if="showIcon"
                class="li-alert__icon"
                :class="{ 'big-icon': withDescription }"
                :icon="iconName"
            />
            <div class="li-alert__content">
                <span
                    class="li-alert__title"
                    :class="{ 'with-desc': withDescription }"
                    :style="{
                        display: center && !showIcon ? 'flow' : 'inline',
                    }"
                >
                    <slot name="title">{{ title }}</slot>
                </span>
                <p class="li-alert__description">
                    <slot>{{ description }}</slot>
                </p>
                <div class="li-alert__close" v-if="closable">
                    <li-icon @click.stop="close" icon="xmark" />
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
@import './style.css';
</style>
