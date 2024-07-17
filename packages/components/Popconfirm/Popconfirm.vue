<script setup lang="ts">
import { ref, computed } from 'vue';
import { addUnit } from '@ui-library/utils';
import { useLocale } from '@ui-library/hooks';
import type { TooltipInstance } from '../Tooltip';
import type { PopconfirmProps, PopconfirmEmits } from './types';

import LiTooltip from '../Tooltip/Tooltip.vue'; // 要从相对路径引入
import LiButton from '../Button/Button.vue';
import LiIcon from '../Icon/Icon.vue';

defineOptions({
    name: 'LiPopconfirm',
});

const props = withDefaults(defineProps<PopconfirmProps>(), {
    title: '',
    confirmButtonType: 'primary',
    icon: 'question-circle',
    iconColor: '#f90',
    hideAfter: 200,
    width: 150,
}); // 并设置默认值

const emits = defineEmits<PopconfirmEmits>();
const tooltipRef = ref<TooltipInstance>();
const style = computed(() => ({ width: addUnit(props.width) })); // 将宽度转换为带单位的字符串

const locale = useLocale(); // 用于本地化

// 隐藏 tooltip
function hidePopper() {
    tooltipRef.value?.hide();
}
// 触发 confirm 事件并隐藏 tooltip
function confrim(e: MouseEvent) {
    emits('confirm', e);
    hidePopper();
}
// 触发 cancel 事件并隐藏 tooltip
function cancel(e: MouseEvent) {
    emits('cancel', e);
    hidePopper();
}
</script>

<template>
    <!-- 使用 li-tooltip 组件包裹整个 popconfirm，并设置 trigger 为 click 触发，隐藏超时时间为 hideAfter -->
    <li-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
        <!-- 使用 template 定义 tooltip 的 content 插槽 -->
        <template #content>
            <!-- 根据 props 宽度 -->
            <!-- 这个就是点击之后 显示个图标和段文字  然后两个按钮在下面 -->
            <div class="li-popconfirm" :style="style">
                <div class="li-popconfirm__main">
                    <li-icon
                        v-if="!hideIcon && icon"
                        :icon="icon"
                        :color="iconColor"
                    />
                    {{ title }}
                </div>

                <!-- 两个按钮  取消和确认 -->
                <div class="li-popconfirm__action">
                    <li-button
                        class="li-popconfirm__cancel"
                        size="small"
                        :type="cancelButtonType"
                        @click="cancel"
                    >
                        {{
                            cancelButtonText ||
                            locale.t('popconfirm.cancelButtonText')
                        }}
                    </li-button>
                    <li-button
                        class="li-popconfirm__confirm"
                        size="small"
                        :type="confirmButtonType"
                        @click="confrim"
                    >
                        {{
                            confirmButtonText ||
                            locale.t('popconfirm.confirmButtonText')
                        }}
                    </li-button>
                </div>
            </div>
        </template>

        <!-- 定义两个具名插槽 default 和 reference，用于自定义 popconfirm 的内容 -->
        <template v-if="$slots.default" #default>
            <slot name="default"></slot>
        </template>

        <template v-if="$slots.reference" #default>
            <slot name="reference"></slot>
        </template>
    </li-tooltip>
</template>

<style scoped>
@import './style.css';
</style>
