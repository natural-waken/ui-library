export declare const LiCollapse: {
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: import('vue').PropType<import('./types').CollapseItemName[]>;
            required: true;
        };
        accordion: {
            type: import('vue').PropType<boolean>;
        };
    }>> & {
        onChange?: ((value: import('./types').CollapseItemName[]) => any) | undefined;
        "onUpdate:modelValue"?: ((value: import('./types').CollapseItemName[]) => any) | undefined;
    }, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        "update:modelValue": (value: import('./types').CollapseItemName[]) => void;
        change: (value: import('./types').CollapseItemName[]) => void;
    }, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: import('vue').PropType<import('./types').CollapseItemName[]>;
            required: true;
        };
        accordion: {
            type: import('vue').PropType<boolean>;
        };
    }>> & {
        onChange?: ((value: import('./types').CollapseItemName[]) => any) | undefined;
        "onUpdate:modelValue"?: ((value: import('./types').CollapseItemName[]) => any) | undefined;
    }, {}, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: import('vue').PropType<import('./types').CollapseItemName[]>;
            required: true;
        };
        accordion: {
            type: import('vue').PropType<boolean>;
        };
    }>> & {
        onChange?: ((value: import('./types').CollapseItemName[]) => any) | undefined;
        "onUpdate:modelValue"?: ((value: import('./types').CollapseItemName[]) => any) | undefined;
    }, {}, {}, {}, {}, {}>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: import('vue').PropType<import('./types').CollapseItemName[]>;
        required: true;
    };
    accordion: {
        type: import('vue').PropType<boolean>;
    };
}>> & {
    onChange?: ((value: import('./types').CollapseItemName[]) => any) | undefined;
    "onUpdate:modelValue"?: ((value: import('./types').CollapseItemName[]) => any) | undefined;
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: import('./types').CollapseItemName[]) => void;
    change: (value: import('./types').CollapseItemName[]) => void;
}, string, {}, {}, string, {}> & (import('vue').VNodeProps & (import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & ((new () => {
    $slots: {
        default?(_: {}): any;
    };
}) & import('vue').Plugin)));
export declare const LiCollapseItem: {
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        name: {
            type: import('vue').PropType<import('./types').CollapseItemName>;
            required: true;
        };
        title: {
            type: import('vue').PropType<string>;
        };
        disabled: {
            type: import('vue').PropType<boolean>;
        };
    }>>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        name: {
            type: import('vue').PropType<import('./types').CollapseItemName>;
            required: true;
        };
        title: {
            type: import('vue').PropType<string>;
        };
        disabled: {
            type: import('vue').PropType<boolean>;
        };
    }>>, {}, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        name: {
            type: import('vue').PropType<import('./types').CollapseItemName>;
            required: true;
        };
        title: {
            type: import('vue').PropType<string>;
        };
        disabled: {
            type: import('vue').PropType<boolean>;
        };
    }>>, {}, {}, {}, {}, {}>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    name: {
        type: import('vue').PropType<import('./types').CollapseItemName>;
        required: true;
    };
    title: {
        type: import('vue').PropType<string>;
    };
    disabled: {
        type: import('vue').PropType<boolean>;
    };
}>>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {}, {}, string, {}> & (import('vue').VNodeProps & (import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & ((new () => {
    $slots: {
        title?(_: {}): any;
        default?(_: {}): any;
    };
}) & import('vue').Plugin)));
export * from './types';
