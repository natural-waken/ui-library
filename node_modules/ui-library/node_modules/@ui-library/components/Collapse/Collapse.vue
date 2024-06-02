<script setup lang="ts">
import type { CollapseProps, CollapseEmits, CollapseItemName } from './types';
import { ref, provide, watch, watchEffect } from 'vue';
import { debugWarn } from '@ui-library/utils';
import { COLLAPSE_CTX_KEY } from './constants';

const COMP_NAME = 'LiCollapse' as const;

defineOptions({
    name: COMP_NAME,
});

const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames = ref(props.modelValue);

// 判断要是手风琴模式为 true, 并且数组长度大于 1
if (props.accordion && activeNames.value.length > 1) {
    // 手风琴模式只能有个 active
    // console.warn('accordion mode should only hace one active item');
    debugWarn(COMP_NAME, 'accordion mode should only hace one active item');
}

// 主要处理折叠项（Collapse Item）的点击事件
// 如果是手风琴模式，则只允许一个项处于激活状态。否则，根据点击项的存在与否，添加或移除该项
function handleItemClick(item: CollapseItemName) {
    let _activeNames = [...activeNames.value]; // 复制当前激活的折叠项
    // 处于手风琴模式
    if (props.accordion) {
        // 如果当前激活的项就是被点击的项 item，则取消激活（设为''）；否则，将被点击的项 item 设为激活状态
        _activeNames = [_activeNames[0] === item ? '' : item];
        updateActiveNames(_activeNames); // 更新激活的折叠项
        return;
    }

    // 普通模式处理  查找点击的项索引
    const index = _activeNames.indexOf(item);
    if (index > -1) {
        // 存在，删除数组中的一项
        _activeNames.splice(index, 1);
    } else {
        // 不存在，插入对应 name
        // push 进来 这样我们传进新的是展开状态
        _activeNames.push(item);
    }
    updateActiveNames(_activeNames); // 更新 activeNames 的值，并触发相应的事件
}

function updateActiveNames(newNames: CollapseItemName[]) {
    activeNames.value = newNames;
    emits('update:modelValue', newNames);
    emits('change', newNames);
}

watchEffect(() => {
    if (props.accordion && activeNames.value.length > 1) {
        // console.warn('accordion mode should only have one active item');
        // 要先传入是哪里报错了    然后传入字符信息
        debugWarn(COMP_NAME, 'accordion mode should only hace one active item');
    }
});

watch(
    () => props.modelValue,
    (newNames) => updateActiveNames(newNames),
);

// 依赖注入写好
// 使用 provide 向组件树下的所有子组件注入 使其可以访问和调用
provide(COLLAPSE_CTX_KEY, {
    activeNames,
    handleItemClick,
});
</script>

<template>
    <div class="li-collapse">
        <!-- 用默认插槽去关联我们的子组件和父级组件 -->
        <slot></slot>
    </div>
</template>

<style scoped>
@import './style.css';
</style>
