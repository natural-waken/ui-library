<script setup lang="ts">
import { computed, ref, provide } from 'vue';
import { omit, isNil } from 'lodash-es';
import { type ButtonInstance, LiButton, LiButtonGroup } from '../Button/index';
import type { TooltipInstance } from '../Tooltip/types';
import type {
    DropdownProps,
    DropdownItemProps,
    DropdownEmits,
    DropdownInstance,
    DropdownContext,
} from './types';
import { useDisabledStyle } from '@ui-library/hooks';

import { DROPDOWN_CTX_KEY } from './constants';
import DropdownItem from './DropdownItem.vue';
import LiTooltip from '../Tooltip/Tooltip.vue';

defineOptions({
    name: 'LiDropdown',
    inheritAttrs: false,
});
const props = withDefaults(defineProps<DropdownProps>(), {
    hideOnClick: true,
    items: () => [] as DropdownItemProps[],
});
const emits = defineEmits<DropdownEmits>();
const slots = defineSlots();

const tooltipRef = ref<TooltipInstance>();
const triggerRef = ref<ButtonInstance>();
const virtualRef = computed(() => triggerRef.value?.ref ?? void 0);

// 从 dropdown props 中排除这些就是 tooltip props  因为我们 dropdown props 是从 tooltip props 中继承的
const tooltipProps = computed(
    () =>
        omit(props, ['items', 'hideAfterClick', 'size', 'type', 'splitButton']), // 排除掉一些不需要传递给 Tooltip 组件的 props
);

function handleItemClick(e: DropdownItemProps) {
    // 处理菜单项点击事件。如果 hideOnClick 为真，则隐藏 Tooltip。如果菜单项有命令，则触发 command 事件
    props.hideOnClick && tooltipRef.value?.hide();
    !isNil(e.command) && emits('command', e.command);
}

// 如果不是测试环境，调用 useDisabledStyle 函数。
!TEST && useDisabledStyle();

// 依赖注入
// 使用 provide 函数提供上下文 DropdownContext，包括 handleItemClick 函数和 size 计算属性。
provide<DropdownContext>(DROPDOWN_CTX_KEY, {
    handleItemClick,
    size: computed(() => props.size), // size 是用来规定每个 item 大小
});

// 公开 open 和 close 方法，允许外部调用
defineExpose<DropdownInstance>({
    open: () => tooltipRef.value?.show(),
    close: () => tooltipRef.value?.hide(),
});
</script>

<template>
    <div class="li-dropdown" :class="{ 'is-disabled': props.disabled }">
        <!-- 当 splitButton 为真时，启用虚拟触发     将 triggerRef 的值作为虚拟引用 -->
        <li-tooltip
            ref="tooltipRef"
            v-bind="tooltipProps"
            :virtual-triggering="splitButton"
            :virtual-ref="virtualRef?.value"
            @visible-change="$emit('visible-change', $event)"
        >
            <!-- 当 splitButton 为真时，渲染一个 li-button-group 组件。 -->
            <!-- button group 大小 size 是外部展示的 按钮大小 -->
            <li-button-group
                v-if="splitButton"
                :type="type"
                :size="size"
                :disabled="disabled"
            >
                <li-button @click="$emit('click', $event)">
                    <slot name="default"></slot>
                </li-button>
                <li-button ref="triggerRef" icon="angle-down" />
                <!-- 显示向下箭头图标 -->
            </li-button-group>

            <slot name="default" v-else></slot>
            <!-- 如果 splitButton 为假，直接渲染名为 default 的插槽内容 -->
            <template #content>
                <div class="li-dropdown__menu">
                    <slot name="dropdown">
                        <template v-for="item in items" :key="item.command">
                            <dropdown-item v-bind="item" />
                        </template>
                    </slot>
                </div>
            </template>
            <!-- 并为每个菜单项渲染一个 dropdown-item 组件 -->
        </li-tooltip>
    </div>
</template>

<style scoped>
@import './style.css';

:deep(.li-button-group) {
    & > :last-child {
        padding: 5px 7px;
    }
}
</style>
