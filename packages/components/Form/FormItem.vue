<script setup lang="ts">
import type {
    FormItemContext,
    FormItemProps,
    FormValidateFailuer,
    FormValidateCallback,
    ValidateStatus,
    FormItemInstance,
    FormItemRule,
} from './types';

import Schema, { type RuleItem } from 'async-validator'; // Schema 用于验证数据是否符合规则
import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from './constants';
import {
    inject,
    onMounted,
    ref,
    reactive,
    toRefs,
    computed,
    onUnmounted,
    type Ref,
    provide,
    nextTick,
} from 'vue';
import {
    isNil,
    get,
    isString,
    size,
    filter,
    map,
    includes,
    keys,
    isArray,
    cloneDeep,
    some,
    isNumber,
    endsWith,
} from 'lodash-es';
import { useId } from '@ui-library/hooks';

defineOptions({ name: 'LiFormItem' });

// 组件属性
// 声明组件接收的 props 的类型为 FormItemProps
const props = withDefaults(defineProps<FormItemProps>(), {
    required: void 0,
    showMessage: true,
});
const slots = defineSlots();
const ctx = inject(FORM_CTX_KEY); // 获取父组件  注入 form 上下文       这样表单项可以与父表单进行通信

const labelId = useId().value;

// 定义表单项的验证状态和错误信息
const validateStatus: Ref<ValidateStatus> = ref('init');
const errMsg = ref('');
const inputIds = ref<string[]>([]);
// inputIds 就是我们为了下面方法 addInputId 和 removeInputId

// 用于获取指定属性的值
// 根据传入的对象和属性，返回该属性的值，如果不存在则返回 null
const getValByProp = (target: Record<string, any> | void) => {
    if (target && props.prop && !isNil(get(target, props.prop))) {
        // 从 target 中提取 props.prop 的值
        return get(target, props.prop);
    }
    return null;
};

// 两种传递方式  props  插槽
const hasLabel = computed(() => !!(props.label || slots.label));
const labelFor = computed(
    () => props.for || (inputIds.value.length ? inputIds.value[0] : ''),
);
// 就是显示的当前的 label    那个是后缀  留了个加后缀的
const currentLabel = computed(
    () => `${props.label ?? ''}${ctx?.labelSuffix ?? ''}`,
);

// 计算并返回一个标签宽度的值   加上后缀 px
const normalizeLabelWidth = computed(() => {
    // 将输入的 val 值规范化为带有 px 后缀的字符串格式。val 可以是一个数字或字符串
    const _normalizeStyle = (val: number | string) => {
        if (isNumber(val)) return `${val}px`;
        return endsWith(val, 'px') ? val : `${val}px`;
    };

    // 这个判断就是当前组件直接传进来的优先级高于  form 上下文的 label width 优先级     会覆盖那个
    // 也就是说我们在 form 中写了个 width 是全部的    但是我们单独在这个组件中写   那就是只有这个改了  单独的样式
    if (props.labelWidth) return _normalizeStyle(props.labelWidth);
    if (ctx?.labelWidth) return _normalizeStyle(ctx?.labelWidth);
    return '150px';
});

// 当前表单项是否被禁用
const isDisabled = computed(() => ctx?.disabled || props.disabled);
// 是否是必填
// 就是 表单不隐藏星号 *    在 rules 能找到 required   或者这个表单项传入了 required
const isRequired = computed(
    () =>
        (!ctx?.hideRequiredAsterisk && some(itemRules.value, 'required')) ||
        props?.required,
);

// 获取表单模型 model 中的当前值
// model 通常是一个包含表单数据的对象，它代表了整个表单的状态。
// 每个表单项（如输入框、选择框等）通过 prop 属性与 model 中的具体字段关联，形成一个数据绑定。
const innerVal = computed(() => {
    const model = ctx?.model;
    return getValByProp(model);
});
// 将 prop 属性转换为字符串形式
const propString = computed(() => {
    if (!props.prop) return '';
    return isString(props.prop) ? props.prop : props.prop.join('.');
});

// 收集并整合所有的验证规则
const itemRules = computed(() => {
    // 这个就是说  我们要是 rules 里面没有 required  但是在 props 中有写   我们就要加一条进去
    const { required } = props; // 解构出 required
    const rules: FormItemRule[] = []; // 用于存储整合后的验证规则

    // 如果组件属性中定义了 rules，将它们添加到 rules 数组中
    // 这个就是我们可以在 formItem 的 props 写 rules       就是单独给某个 item 写规则
    // 也可以在 form 整体写 rules
    // 这里我们就是做次融合
    if (props.rules) {
        rules.push(...props.rules);
    }
    const formRules = ctx?.rules; // 这个就是 form props 里面 ctx 上下文传进来
    // prop 要是存在   表示这个表单项在数据模型中有对应的字段
    if (formRules && props.prop) {
        // 从 formRules 中提取与当前 prop 相关的规则
        const _rules = getValByProp(formRules);
        if (_rules) {
            rules.push(..._rules);
        }
    }

    // 要是有 required   就也加进来
    // 处理表单项的必填规则（required）    并将这些规则整合到 rules 数组中
    // 下面代码主要是   确保每个规则（rule）都应用了正确的 required 设置
    if (!isNil(required)) {
        // map  将 rules 数组中的每一项 rule 与其索引 i 组成一个新的数组 [rule, i]
        // filter   从 [rule, i] 数组中筛选出那些包含 required 属性的规则
        const requiredRules = filter(
            map(rules, (rule, i) => [rule, i]),
            (item: [FormItemRule, number]) =>
                includes(keys(item[0]), 'required'),
        );

        // 数组长度大于 0   说明存在包含 required 属性的规则
        if (size(requiredRules)) {
            for (const item of requiredRules) {
                // 解构出规则 rule 和它的索引 i  item  index
                const [rule, i] = item as [FormItemRule, number];
                // 如果当前规则的 required 值已经和 props 中的 required 值相同，那么就跳过这个规则
                // 就是我已经有了  不用再添加了
                if (rule.required === required) continue;
                // 不相等就更新
                rules[i] = { ...rule, required };
            }
        } else {
            // 即没有包含 required 属性的规则，则将一个新的包含 required 属性的规则添加到 rules 数组中
            rules.push({ required });
        }
    }

    return rules;
});

// 用于保存初始值和重置状态
let initialVal: any = null;
let isResetting: boolean = false;
// 根据触发器的类型筛选表单验证规则
// 创建触发器就是  blur  change  submit  等等   定义了何时执行表单验证
function getTriggeredRules(trigger: string) {
    const rules = itemRules.value; // 获取表单项的所有规则
    if (!rules) return []; // 如果没有规则，返回空数组

    // 对 rules 所有规则进行筛选
    // 先 filter  再 map    选出对应 trigger 项
    return filter(rules, (r) => {
        // 如果规则 r 没有 trigger 属性，或者没有传入 trigger  默认返回 true，表示这个规则会被包含在结果中
        // 意味着规则不依赖于任何特定的触发器    即它们将应用于所有触发器事件   就是这条规则是通用的
        if (!r?.trigger || !trigger) return true;
        // 如果规则的 trigger 属性是数组，则检查传入的 trigger 是否在这个数组中
        if (isArray(r.trigger)) {
            return r.trigger.includes(trigger);
        }
        // 不是数组   则与传入的 trigger 进行比较
        return r.trigger === trigger;
    }).map(({ trigger, ...rule }) => rule as RuleItem);
    // 在过滤后的规则数组中，map 方法用于对每个规则进行变换。具体操作是移除 trigger 属性，并返回去掉该属性的规则对象
    // { }   解构用于提取 trigger 属性并将剩余的属性收集到 rule 对象中。
    // 将剩余的属性强制转换为 RuleItem 类型
    // 因为我们多加了个 trigger   这步结束之后 trigger 使命就结束了    因为加触发条件就是为了做筛选  现在筛选完了
}

// 执行校验  根据校验规则
async function doValidate(rules: RuleItem[]) {
    // 获取当前表单项的属性名（如 'username'） 用于定义验证规则的键
    const modleName = propString.value;

    // 创建一个验证器实例，Schema 用来定义和处理验证规则        modleName 是键，rules 是定义的验证规则
    const validator = new Schema({ [modleName]: rules });

    // 执行验证
    return (
        validator
            // 使用库里面自带 validate 方法对表单项的值进行验证       表示只验证第一个字段
            .validate({ [modleName]: innerVal.value }, { firstFields: true })
            .then(() => {
                // 如果验证通过
                validateStatus.value = 'success'; // 设置验证状态为成功
                ctx?.emits('validate', props, true, ''); // 触发验证成功的事件
                return true; // 返回验证成功的结果
            })
            .catch((err: FormValidateFailuer) => {
                // 如果验证失败
                const { errors } = err; // 提取错误信息
                validateStatus.value = 'error'; // 设置验证状态为错误
                errMsg.value =
                    errors && size(errors) > 0 ? errors[0].message ?? '' : ''; // 设置错误信息，如果有错误，则取第一个错误的消息
                ctx?.emits('validate', props, false, errMsg.value); // 触发验证失败的事件
                return Promise.reject(err); // 返回一个被拒绝的 Promise，包含错误信息
            })
    );
}

// 验证函数，接收一个触发器类型和可选的回调函数
const validate: FormItemInstance['validate'] = async function (
    trigger: string,
    callback?: FormValidateCallback,
) {
    // 对边缘情况处理
    // 如果表单项正在重置状态   表单项没有绑定数据字段   表单项被禁用   返回 false
    if (isResetting || !props.prop || isDisabled.value) return false;

    // 当前没有有效的验证状态  例如 'init'    意味着验证不能继续进行
    if (!validateStatus.value) {
        callback?.(false);
        return false;
    }

    // 获取与指定触发器相关的规则
    const rules = getTriggeredRules(trigger);
    // 要是数组为空  这意味着没有规则需要验证，验证通过  调用回调返回 true
    if (!size(rules)) {
        callback?.(true);
        return true;
    }

    // 验证过程已经开始
    validateStatus.value = 'validating';
    // 调用执行验证
    return doValidate(rules)
        .then(() => {
            callback?.(true);
            return true;
        })
        .catch((err: FormValidateFailuer) => {
            const { fields } = err;
            callback?.(false, fields);
            return Promise.reject(fields);
        });
};

// 重置字段到初始状态，并清除验证信息
const resetField: FormItemInstance['resetField'] = function () {
    const model = ctx?.model;
    if (model && propString.value && !isNil(get(model, propString.value))) {
        isResetting = true;
        //  将 model 对象中对应的字段重置为 initialVal 的深拷贝     重置了表单项的值为其初始状态
        model[propString.value] = cloneDeep(initialVal);
    }
    // 可以确保在视图更新后清除验证信息
    nextTick(() => clearValidate());
};
// 清除验证状态和错误信息
const clearValidate: FormItemInstance['clearValidate'] = function () {
    validateStatus.value = 'init'; // 初始化状态
    errMsg.value = '';
    isResetting = false;
};

// 添加表单 id 和 移除 id
const addInputId: FormItemContext['addInputId'] = function (id) {
    // 把不存在的 push  存在就不 push 了
    if (!includes(inputIds.value, id)) inputIds.value.push(id);
};

const removeInputId: FormItemContext['removeInputId'] = function (id) {
    inputIds.value = filter(inputIds.value, (i) => i !== id);
};

// 创建一个表单项的上下文，并提供必要的方法和属性
// 就是根据这里面的我们去实现  这些方法
const formItemCtx: FormItemContext = reactive({
    ...toRefs(props),
    disabled: isDisabled.value,
    validate,
    resetField,
    clearValidate,
    addInputId,
    removeInputId,
});

onMounted(() => {
    if (!props.prop) return;
    // 将表单项添加到父组件中
    ctx?.addField(formItemCtx);
    // 这一步是为了我们在 reset 时有刚开始保存的值
    initialVal = innerVal.value;
});

onUnmounted(() => {
    if (!props.prop) return;
    // 将表单项添加到父组件中
    ctx?.removeField(formItemCtx);
});

provide<FormItemContext>(FORM_ITEM_CTX_KEY, formItemCtx);

defineExpose<FormItemInstance>({
    validateMessage: errMsg,
    validateStatus,
    validate,
    resetField,
    clearValidate,
});
</script>

<template>
    <div
        class="li-form-item"
        :class="{
            'is-error': validateStatus === 'error',
            'is-disabled': isDisabled,
            'is-required': isRequired,
            'asterisk-left': ctx?.requiredAsteriskPosition === 'left',
            'asterisk-right': ctx?.requiredAsteriskPosition === 'right',
        }"
    >
        <!-- 这是 label -->
        <!-- :is 判断 labelFor 是否 就是原生 label  不然就是 div -->
        <!-- 这些都是我们对原生 label 标签的处理  做了一系列校验 -->
        <component
            v-if="hasLabel"
            class="li-form-item__label"
            :class="`position-${ctx?.labelPosition ?? `right`}`"
            :is="labelFor ? 'label' : 'div'"
            :id="labelId"
            :for="labelFor"
        >
            <!-- 这个就是可以通过个具名插槽传 label -->
            <!-- 也就是我们不能直接写 {{  }}  要写成 slot 里面写这个就是没有 slot 的话就显示 {{  }} 的值 -->
            <slot name="label" :label="currentLabel">
                {{ currentLabel }}
            </slot>
        </component>

        <!-- 这是表单内容 -->
        <!-- 它允许子组件向插槽的内容提供数据，使得插槽内容可以访问这些数据 -->
        <div class="li-form-item__content">
            <slot :validate="validate"></slot>
            <!-- 校验状态是 error 时  展示下面这个 -->
            <div
                class="li-form-item__error-msg"
                v-if="validateStatus === 'error'"
            >
                <template v-if="ctx?.showMessage && showMessage">
                    <!-- 就是我们可以用这个 slot 具名插槽强行覆盖 errMsg -->
                    <slot name="error" :error="errMsg">{{ errMsg }}</slot>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import './style.css';

/* 这个属性我们在 style.css 中写过了   这下就是再重新覆盖下 */
.li-form-item {
    --li-form-lebel-width: v-bind(normalizeLabelWidth) !important;
}
</style>
