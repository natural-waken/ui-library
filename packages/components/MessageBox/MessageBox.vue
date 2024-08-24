<script setup lang="ts">
import type { MessageBoxProps, MessageBoxAction } from './types';
import type { InputInstance } from '../Input/types';
import { useZIndex, useId } from '@ui-library/hooks';
import { typeIconMap } from '@ui-library/utils';
import { reactive, computed, ref, watch, nextTick, type Ref } from 'vue';

import LiOverlay from '../Overlay/Overlay.vue';
import LiIcon from '../Icon/Icon.vue';
import LiButton from '../Button/Button.vue';
import LiInput from '../Input/Input.vue';
import { isFunction, isNil } from 'lodash-es';

defineOptions({
    name: 'LiMessageBox',
    inheritAttrs: false,
});

// 定义组件属性，并提供默认值
const props = withDefaults(defineProps<MessageBoxProps>(), {
    lockScroll: true,
    showClose: true,
    closeOnClickModal: true,
    confirmButtonType: 'primary',
    roundButton: false,
    boxType: '',
    inputValue: '',
    inputPlaceholder: 'Please input...',
    confirmButtonText: 'Ok',
    cancelButtonText: 'Cancel',
    showConfirmButton: true,
});

const { doAction } = props;  // 提取回调
const { nextZIndex } = useZIndex();  // 下个的 index

const headerRef = ref<HTMLElement>();
const inputRef = ref<InputInstance>();
const inputId = useId();

const state = reactive({
    ...props,
    zIndex: nextZIndex(),
});

// 存在 message    有可能是不存在 message
const hasMessage = computed(() => !!state.message);
const iconComponent = computed(
    () => state.icon ?? typeIconMap.get(state.type ?? ''),
);

// 监视 visible 属性的变化，以更新 zIndex 和在显示时聚焦输入框
watch(
    () => props.visible?.value,
    (val) => {
        if (val) state.zIndex = nextZIndex();
        if (props.boxType !== 'prompt') return;

        if (!val) return;

        // 使用 nextTick 在下一次 DOM 更新后，聚焦到输入框
        nextTick(() => {
            inputRef.value && inputRef.value.focus();
        });
    },
);

// 函数在点击蒙层时触发，如果 closeOnClickModal 为 true，则执行关闭动作
function handleWrapperClick() {
    props.closeOnClickModal && handleAction('close');
}

// 函数在输入框中按下 Enter 键时触发，如果输入类型是 textarea，则返回，否则阻止默认行为并执行确认动作
function handleInputEnter(e: KeyboardEvent) {
    if (state.inputType === 'textarea') return;
    e.preventDefault();
    return handleAction('confirm');  // 回车就是默认提交
}

// 如果 beforeClose 是函数，则先调用它，然后执行动作    在回调中执行 doAction。否则，直接执行 doAction
function handleAction(action: MessageBoxAction) {
    isFunction(props.beforeClose)
        ? props.beforeClose(action, state, () =>
              doAction(action, state.inputValue),
          )
        : doAction(action, state.inputValue);
}

// 直接调用 handleAction 执行关闭动作
function handleClose() {
    handleAction('close');
}
</script>

<template>
    <transition name="fade-in-linear" @after-leave="destroy">
        <!-- <li-overlay>：自定义组件 LiOverlay，显示一个遮罩层
            点击遮罩层时调用 handleWrapperClick 函数
        -->
        <li-overlay
            v-show="(visible as Ref).value"
            :z-index="state.zIndex"
            mask
        >
            <div
                role="dialog"
                class="li-overlay-message-box"
                @click="handleWrapperClick"
            >
                <!-- 阻止点击事件冒泡，以避免点击消息框内部时触发遮罩层的点击事件 -->
                <div
                    ref="rootRef"
                    :class="[
                        'li-message-box',
                        {
                            'is-center': state.center,
                        },
                    ]"
                    @click.stop
                >
                    <!-- header -->
                    <div
                        v-if="!isNil(state.title)"
                        ref="headerRef"
                        class="li-message-box__header"
                        :class="{ 'show-close': state.showClose }"
                    >
                        <div class="li-message-box__title">
                            <li-icon
                                v-if="iconComponent && state.center"
                                :class="{
                                    [`li-icon-${state.type}`]: state.type,
                                }"
                                :icon="iconComponent"
                            />
                            {{ state.title }}
                        </div>
                        <!-- 点击关闭按钮时调用 handleClose 函数，并阻止事件冒泡 -->
                        <button
                            v-if="showClose"
                            class="li-message-box__header-btn"
                            @click.stop="handleClose"
                        >
                            <li-icon icon="xmark" />
                        </button>
                    </div>

                    <!-- content -->
                    <div class="li-message-box__content">
                        <!-- 如果有图标且未居中且有消息内容，则显示图标 -->
                        <li-icon
                            v-if="iconComponent && !state.center && hasMessage"
                            :class="{
                                [`li-icon-${state.type}`]: state.type,
                            }"
                            :icon="iconComponent"
                        />
                        <!-- 如果有消息内容，则显示消息 -->
                        <div v-if="hasMessage" class="li-message-box__message">
                            <!-- 使用 slot 插槽可以替换默认消息内容。 -->
                            <slot>
                                <!-- 指定动态组件，根据是否有输入框显示 label 或 p 标签     :for 绑定 inputId，用于输入框的关联 -->
                                <component
                                    :is="state.showInput ? 'label' : 'p'"
                                    :for="state.showInput ? inputId : void 0"
                                >
                                    {{ state.message }}
                                </component>
                            </slot>
                        </div>
                    </div>

                    <!-- 输入框 -->
                    <div v-show="state.showInput" class="li-message-box__input">
                        <!-- 按下 Enter 键时调用 handleInputEnter 函数 -->
                        <li-input
                            v-model="state.inputValue"
                            ref="inputRef"
                            :placeholder="state.inputPlaceholder"
                            :type="state.inputType"
                            @keyup.enter="handleInputEnter"
                        />
                    </div>

                    <!-- footer -->
                    <div class="li-message-box__footer">
                        <!-- 绑定取消按钮的类型、圆角、加载状态，并在点击或按下 Enter 键时调用 handleAction('cancel') -->
                        <li-button
                            v-if="state.showCancelButton"
                            class="li-message-box__footer-btn li-message-box__cancel-btn"
                            :type="state.cancelButtonType"
                            :round="state.roundButton"
                            :loading="state.cancelButtonLoading"
                            @click="handleAction('cancel')"
                            @keydown.prevent.enter="handleAction('cancel')"
                            >{{ state.cancelButtonText }}</li-button
                        >
                        <li-button
                            v-show="state.showConfirmButton"
                            class="li-message-box__footer-btn li-message-box__confirm-btn"
                            :type="state.confirmButtonType ?? 'primary'"
                            :round="state.roundButton"
                            :loading="state.confirmButtonLoading"
                            @click="handleAction('confirm')"
                            @keydown.prevent.enter="handleAction('confirm')"
                            >{{ state.confirmButtonText }}</li-button
                        >
                    </div>
                </div>
            </div>
        </li-overlay>
    </transition>
</template>

<style>
@import './style.css';
</style>
