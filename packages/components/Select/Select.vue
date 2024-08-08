<script setup lang="ts">
import {
    each,
    eq,
    filter,
    find,
    get,
    size,
    noop,
    isFunction,
    map,
    assign,
    isNil,
    isBoolean,
    includes,
    debounce,
} from 'lodash-es';
import {
    h,
    ref,
    reactive,
    computed,
    provide,
    watch,
    nextTick,
    type VNode,
    onMounted,
} from 'vue';
import type {
    SelectProps,
    SelectEmits,
    SelectOptionProps,
    SelectContext,
    SelectInstance,
    SelectStates,
} from './types';
import type { TooltipInstance } from '../Tooltip/types';
import type { InputInstance } from '../Input/types';
import { useId } from '@ui-library/hooks';
import { useFocusController, useClickOutside } from '@ui-library/hooks';
import { SELECT_CTX_KEY, POPPER_OPTIONS } from './constants';
import { debugWarn, RenderVnode } from '@ui-library/utils';

import LiTooltip from '../Tooltip/Tooltip.vue';
import LiIcon from '../Icon/Icon.vue';
import LiInput from '../Input/Input.vue';
import LiOption from './Option.vue';
import useKeyMap from './useKeyMap';

const COMPONENT_NAME = 'LiSelect' as const;
defineOptions({
    name: COMPONENT_NAME,
});
const props = withDefaults(defineProps<SelectProps>(), {
    options: () => [],
});
const emits = defineEmits<SelectEmits>();
const slots = defineSlots();

const selectRef = ref<HTMLElement>();
const tooltipRef = ref<TooltipInstance>();
const inputRef = ref<InputInstance>();
const filteredChilds = ref<Map<VNode, SelectOptionProps>>(new Map()); // map 类型  存储过滤后的子组件
const filteredOptions = ref(props.options ?? []); // 过滤后的选项
const isDropdownVisible = ref(false); // 下拉菜单是否可见

const initialOption = findOption(props.modelValue); // 就是为了获取初始值的  获取初始选中的选项

// 存储组件的状态信息
const selectStates = reactive<SelectStates>({
    inputValue: initialOption?.label ?? '',
    selectedOption: initialOption,
    mouseHover: false,
    loading: false,
    highlightedIndex: -1,
});

const isDisabled = computed(() => props.disabled); // 组件是否被禁用
// 获取默认插槽内容中类型为 LiOption 的所有子组件
const children = computed(() =>
    // slots?.default?.() 调用了默认插槽的渲染函数，返回插槽内容的虚拟节点数组
    // 回调函数检查每个插槽内容的类型是否等于 LiOption
    // 因为插槽里面可以写任何内容   我们要放 option
    // 判断下  必须是 option 组件才说明我们有 children
    filter(slots?.default?.(), (child) => eq(child.type, LiOption)),
);
// 是否有子组件 LiOption
// 判断是否有 size 数组长度   为 true
// 要是为 false   就是通过 options  props 传值的
const hasChildren = computed(() => size(children.value) > 0);
// 三个条件都满足时   再展示清空按钮
// 鼠标当前悬停在组件上  并且要有值在时
// 是否显示清空按钮
const showClear = computed(
    () =>
        props.clearable &&
        selectStates.mouseHover &&
        selectStates.inputValue !== '',
);

// 返回当前高亮选中选项
const highlightedLine = computed(() => {
    let result: SelectOptionProps | void;
    if (hasChildren.value) {
        // node 是个虚拟节点
        const node = [...filteredChilds.value][
            selectStates.highlightedIndex
        ]?.[0];
        result = filteredChilds.value.get(node);
    } else {
        result = filteredOptions.value[selectStates.highlightedIndex];
    }

    return result;
});

//   返回子组件的选项列表
const childrenOptions = computed(() => {
    // 没有子节点 也就是没有子组件 LiOption  直接返回 [ ]
    if (!hasChildren.value) return [];

    // vNode 创建个虚拟节点  props 是将 item.props 和 disabled 合并
    // 如果 item.props?.disabled 等于 true， disabled 为 true
    // 否则，如果 item.props?.disabled 不是 null 或 undefined，且不是布尔值，disabled 为 true
    // 其他情况，disabled 为 false
    return map(children.value, (item) => ({
        vNode: h(item),
        props: assign(item.props, {
            disabled:
                item.props?.disabled === true ||
                (!isNil(item.props?.disabled) &&
                    !isBoolean(item.props?.disabled)),
        }),
    }));
});

// 是否没有数据  这个就是筛选中根据输入框筛选下面选项   要是没有就显示 no data
const isNoData = computed(() => {
    // 根据 filterable 属性决定是否启用筛选功能
    if (!props.filterable) return false;
    if (!hasData.value) return true;

    return false;
});
// 是否有数据   两种方式分开判断
const hasData = computed(
    () =>
        (hasChildren.value && filteredChilds.value.size > 0) ||
        (!hasChildren.value && size(filteredOptions.value) > 0),
);
// 来做键盘绑定的  最后一个选项的索引
const lastIndex = computed(() =>
    hasChildren.value
        ? filteredChilds.value.size - 1
        : size(filteredOptions.value) - 1,
);

// 设置输入框的占位符
// 就是下拉可见 并且有选中的值  就展示这个值  不然就是默认
const filterPlaceholder = computed(() =>
    props.filterable && selectStates.selectedOption && isDropdownVisible.value
        ? selectStates.selectedOption.label
        : props.placeholder,
);

// 根据是不是远程来判断  防抖处理的时间
const timeout = computed(() => (props.remote ? 300 : 100));

// 因为我们输入框输入频率是很高的  所以我们使用防抖做处理优化
// 防止输入频率过高时的频繁处理
const handleFilterDebounce = debounce(handleFilter, timeout.value);

const inputId = useId().value;
const {
    wrapperRef: inputWrapperRef,
    isFocused,
    handleBlur,
    handleFocus,
} = useFocusController(inputRef);

// 传参调用函数  并将返回结果赋值给 keyMap
const keyMap = useKeyMap({
    isDropdownVisible,
    controlVisible,
    selectStates,
    highlightedLine,
    handleSelect,
    hasData,
    lastIndex,
});

useClickOutside(selectRef, (e) => handleClickOutsie(e));
const focus: SelectInstance['focus'] = function () {
    inputRef.value?.focus();
};

const blur: SelectInstance['blur'] = function () {
    handleClickOutsie();
};

function handleClickOutsie(e?: Event) {
    if (isFocused.value) {
        nextTick(() => handleBlur(new FocusEvent('focus', e)));
    }
}

// 切换下拉菜单的可见性
// 如果禁用  不可见
function toggleVisible() {
    if (isDisabled.value) return;
    controlVisible(!isDropdownVisible.value);
}

// 控制可见性
function controlVisible(visible: boolean) {
    if (!tooltipRef.value) return; // 要是 tooltip 还没加载出来  就先 return
    get(tooltipRef, ['value', visible ? 'show' : 'hide'])?.(); // visible 为 true  就调用 show   不然就是 hide

    props.filterable && controlInputVal(visible);
    isDropdownVisible.value = visible;
    emits('visible-change', visible);

    selectStates.highlightedIndex = -1;
    // 相当于是每次我们切换可见性时  它的 highlight 就清空  不影响我们下次选择的状态
}

// 控制输入框值
function controlInputVal(visible: boolean) {
    if (!props.filterable) return; // 不可筛选就返回

    // 如果下面弹出层出现  就先清空输入框内容
    if (visible) {
        if (selectStates.selectedOption) selectStates.inputValue = '';
        handleFilterDebounce();
        return;
    }
    selectStates.inputValue = selectStates.selectedOption?.label || ''; // 不然就是显示我们选中的选项
}

function handleClear() {
    inputRef.value?.clear(); // input 框清空
    selectStates.inputValue = '';
    selectStates.selectedOption = null; // 没有选中的选项

    emits('clear'); // 发布事件  通知外部组件或父组件清除操作已执行

    // 并对每个元素调用 emits 函数，发布 change 和 update:modelValue 事件
    each(['change', 'update:modelValue'], (k) => emits(k as any, ''));
    // 预留 formItem 表单校验
}

// 传入个字符串   从我们 props options 中找到要找的值
function findOption(value: string) {
    return find(props.options, (opt) => opt.value === value);
}

// opts 中的每一个 item 来更新 filteredChilds，其中 item.vNode 是新键，item.props 是新值
function setFilteredChilds(opts: typeof childrenOptions.value) {
    filteredChilds.value.clear();
    each(opts, (item) => {
        filteredChilds.value.set(item.vNode, item.props as SelectOptionProps);
    });
}

// 处理选项选择
function handleSelect(opt: SelectOptionProps) {
    if (opt.disabled) return; // 就是这项禁用了的话  再怎么点击也没用  直接返回出去了

    selectStates.inputValue = opt.label; // 将选中的选项标签赋值给输入框的值
    selectStates.selectedOption = opt; // 将选中的选项赋值给 selectedOption
    each(['change', 'update:modelValue'], (k) => emits(k as any, opt.value));
    controlVisible(false); // 也就是我们点击之后  就会自动关闭
    inputRef.value?.focus(); // 聚焦输入框
}
// 处理输入框过滤
function handleFilter() {
    const searcKey = selectStates.inputValue; // 获取输入框的当前值作为搜索关键字
    selectStates.highlightedIndex = -1; // 重置下 highlight 状态

    // 下面两个处理函数  就是分别为两种传值方式
    // 根据是否有子组件，调用相应的过滤函数
    if (hasChildren.value) {
        genFilterChilds(searcKey);
        return;
    }
    genFilterOptions(searcKey);
}

function handleKeyDown(e: KeyboardEvent) {
    // 匹配并调用
    keyMap.has(e.key) && keyMap.get(e.key)?.(e);
}

// 根据搜索关键字 search 过滤子组件 LiOption
async function genFilterChilds(search: string) {
    if (!props.filterable) return; // 说明不符合筛选条件  也就是禁用的判断

    // 这个是远程搜索逻辑  要是有 并且传入了远程搜索方法 且是个函数
    if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
        // 调用 callRemoteMethod 方法，传入远程搜索方法 props.remoteMethod 和搜索关键字 search
        await callRemoteMethod(props.remoteMethod, search);
        // 远程搜索完成，调用 setFilteredChilds 来更新 filteredChilds，使用 childrenOptions.value 作为新数据
        setFilteredChilds(childrenOptions.value);
        return;
    }

    // 没有搜索 然后是 filter 筛选的方法   也就是本地的 filter
    if (props.filterMethod && isFunction(props.filterMethod)) {
        const opts = map(props.filterMethod(search), 'value'); // 提取出所有 value 字段，存入 opts 数组

        // 过滤  条件是 item.props.value 必须在 opts 数组中       筛选后的结果传递给 setFilteredChilds
        setFilteredChilds(
            filter(childrenOptions.value, (item) =>
                includes(opts, get(item, ['props', 'value'])),
            ),
        );
        return;
    }

    // 如果没有远程搜索或自定义筛选方法，使用默认的本地筛选
    // 使用 filter 函数对 childrenOptions.value 进行过滤，条件是 item.props.label 包含搜索关键字 search
    setFilteredChilds(
        filter(childrenOptions.value, (item) =>
            includes(get(item, ['props', 'label']), search),
        ),
    );
}

// 上面那个是 子组件方式的  这个是 props  options
async function genFilterOptions(search: string) {
    if (!props.filterable) return;

    // 提供了远程搜索方法    调用函数
    if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
        // remote search
        filteredOptions.value = await callRemoteMethod(
            props.remoteMethod,
            search,
        );
        return;
    }

    // 是否提供了自定义筛选方法 (props.filterMethod)
    if (props.filterMethod && isFunction(props.filterMethod)) {
        // filter
        filteredOptions.value = props.filterMethod(search);
        return;
    }

    // default
    // filter 函数从 props.options 中筛选出包含搜索关键字 search 的选项。includes(opt.label, search) 检查选项的 label 字段是否包含 search 关键字。
    filteredOptions.value = filter(props.options, (opt) =>
        includes(opt.label, search),
    );
}

// 调用远程搜索方法
// 用来从远程服务器获取数据，比如在下拉选择框中进行远程搜索时
async function callRemoteMethod(method: Function, search: string) {
    if (!method || !isFunction(method)) return; // 不是函数就 return  通常是个异步函数执行

    selectStates.loading = true;
    let result;
    try {
        result = await method(search);
    } catch (error) {
        debugWarn(error as Error);
        debugWarn(COMPONENT_NAME, 'callRemoteMethod error');
        result = [];
        return Promise.reject(error);
    }

    // 返回从远程搜索方法获取的数据
    return result;
}

// 相当于是我们可以自己定义  label  类型
function renderLabel(opt: SelectOptionProps): VNode | string {
    // 如果说我们 props 上自己定义了 renderLabel   那我们就去调用这个函数
    if (isFunction(props.renderLabel)) {
        return props.renderLabel(opt);
    }
    return opt.label;
}

function setSelected() {
    // 找到的话就更新下  值
    const option = findOption(props.modelValue);
    if (!option) return;
    selectStates.inputValue = option.label;
    selectStates.selectedOption = option;
}

// 监视  因为使用者可以在外部改变我们的 option
watch(
    () => props.options,
    (newVal) => {
        filteredOptions.value = newVal ?? [];
    },
);
// 开始就去做下计算
watch(
    () => childrenOptions.value,
    (newVal) => setFilteredChilds(newVal),
    { immediate: true },
);

watch(
    () => props.modelValue,
    () => {
        // 表单校验  逻辑 change
        setSelected();
    },
);

onMounted(() => {
    setSelected();
});

provide<SelectContext>(SELECT_CTX_KEY, {
    handleSelect,
    selectStates,
    renderLabel,
    highlightedLine,
});

defineExpose<SelectInstance>({
    focus,
    blur,
});
</script>

<template>
    <!-- 点击时调用 toggleVisible 方法，用于切换下拉框的可见性。 -->
    <div
        ref="selectRef"
        class="li-select"
        :class="{
            'is-disabled': isDisabled,
        }"
        @click.stop="toggleVisible"
        @mouseenter="selectStates.mouseHover = true"
        @mouseleave="selectStates.mouseHover = false"
    >
        <!-- 点击外部区域时调用 controlVisible(false) 方法来隐藏下拉框 -->
        <li-tooltip
            ref="tooltipRef"
            placement="bottom-start"
            :popper-options="POPPER_OPTIONS"
            @click-outside="controlVisible(false)"
            manual
        >
            <!-- 输入框部分 -->
            <template #default>
                <div ref="inputWrapperRef">
                    <!-- readonly false 也就是 input 可以输入值时     防抖停止 100 ms 就会调用 input 方法 -->
                    <li-input
                        ref="inputRef"
                        v-model="selectStates.inputValue"
                        :id="inputId"
                        :disabled="isDisabled"
                        :placeholder="
                            filterable ? filterPlaceholder : placeholder
                        "
                        :readonly="!filterable || !isDropdownVisible"
                        @focus="handleFocus"
                        @blur="handleBlur"
                        @input="handleFilterDebounce"
                        @keydown="handleKeyDown"
                    >
                        <template #suffix>
                            <!-- 这个是清空按钮 -->
                            <li-icon
                                v-if="showClear"
                                icon="circle-xmark"
                                class="li-input__clear"
                                @click.stop="handleClear"
                                @mousedown.prevent="noop"
                            />
                            <li-icon
                                v-else
                                class="header-angle"
                                icon="angle-down"
                                :class="{ 'is-active': isDropdownVisible }"
                            />
                        </template>
                    </li-input>
                </div>
            </template>

            <!-- Tooltip 内容部分 -->
            <template #content>
                <!-- 没有内容  loading  雪花 -->
                <!-- 处理状态显示 -->
                <div class="li-select__loading" v-if="selectStates.loading">
                    <li-icon icon="spinner" spin />
                </div>
                <div
                    class="li-select__nodata"
                    v-else-if="filterable && isNoData"
                >
                    No data
                </div>

                <!-- 下拉菜单 -->
                <!-- 相当于是 ul  是我们的菜单  里面有 option  每项本质是 li -->
                <ul class="li-select__menu">
                    <!-- 这个判断就是我们没有子组件 li-option  那我们就是用传值进来的 option 去循环 -->
                    <!-- 这里也就是我们上次说的两种方式 -->
                    <template v-if="!hasChildren">
                        <li-option
                            v-for="item in filteredOptions"
                            :key="item.value"
                            v-bind="item"
                        />
                    </template>
                    <template v-else>
                        <template
                            v-for="[vNode, _props] in filteredChilds"
                            :key="_props.value"
                        >
                            <!-- 以子组件形式传入  需要使用 render-vnode 渲染 -->
                            <render-vnode :vNode="vNode" />
                        </template>
                    </template>
                </ul>
            </template>
        </li-tooltip>
    </div>
</template>

<style scoped>
@import './style.css';
</style>
