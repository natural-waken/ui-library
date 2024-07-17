
// // 将关键注入的地方在这里写
// import {
//     ref,
//     getCurrentInstance,
//     inject,
//     computed,
//     provide,
//     unref,
//     watch,
// } from "vue";
// import type { MaybeRef, Ref, App } from "vue";
// import {
//     type ConfigProviderContext,
//     configProviderContextKey,
// } from "./constants";
// import { createI18n, i18nSymbol } from "vue3-i18n";
// import type { TranslatePair } from "@ui-library/locale";
// import English from "@ui-library/locale/lang/en";
// import { merge } from "lodash-es";
// import { debugWarn } from "@ui-library/utils";

// const globalConfig = ref<ConfigProviderContext>();

// export function useGlobalConfig<
//     K extends keyof ConfigProviderContext,
//     D extends ConfigProviderContext[K],
// >(key: K, defaultVal?: D): Ref<Exclude<ConfigProviderContext[K], void>>;  // 返回值类型 排除 void 的类型
// export function useGlobalConfig(): Ref<ConfigProviderContext>;
// export function useGlobalConfig(
//     key?: keyof ConfigProviderContext,
//     defaultVal = void 0  // 可选参数，当 key 对应的配置项不存在时返回的默认值，默认为 undefined
// ) {
//     // getCurrentInstance()：检查当前是否在一个 Vue 组件的 setup 函数中。如果是，则获取当前组件实例。
//     // 如果在组件实例中，使用 inject 函数从 configProviderContextKey 获取注入的配置，或者使用 globalConfig 作为默认值。
//     // 如果不在组件实例中，直接使用全局配置 globalConfig
//     const config = getCurrentInstance()
//         ? inject(configProviderContextKey, globalConfig)
//         : globalConfig;

//     return key ? computed(() => config.value?.[key] ?? defaultVal) : config;
// }

// // 用于创建 i18n 实例
// const _createI18n = (opts?: ConfigProviderContext) => {
//     const mergeMsg = (msg: TranslatePair) =>
//         merge(msg, opts?.extendsI18nMsg ?? {});

//     // 使用 merge 函数（来自 lodash），将 msg 与 opts 中的 extendsI18nMsg 合并，如果 opts 或 extendsI18nMsg 不存在，则合并一个空对象 {}

//     if (!opts?.locale) {
//         return createI18n({
//             locale: "en",
//             messages: mergeMsg({
//                 en: English.el,
//             }),
//         });
//     }
//     //如果没有提供 locale，则创建一个默认的 i18n 实例。
//     // locale 设置为 "en"（英语）。
//     // messages 设置为合并后的消息对象，其中包含 en 的翻译

//     // 如果提供了 locale，则创建一个自定义的 i18n 实例。
//     // locale 设置为 opts.locale?.name，如果 opts.locale 不存在，则默认设置为 "en"
//     return createI18n({
//         locale: opts.locale?.name || "en",
//         messages: mergeMsg({
//             en: English.el,
//             [opts.locale?.name]: opts.locale?.el ?? {},
//         }),
//     });
// };

// export function provideGlobalConfig(
//     config: MaybeRef<ConfigProviderContext> = { locale: English },
//     app?: App,
//     global = false
// ) {
//     const instance = getCurrentInstance();  // 保存当前组件实例
//     const oldCfg = instance ? useGlobalConfig() : void 0;  // 保存旧的全局配置，如果 instance 存在，则调用 useGlobalConfig() 获取旧的全局配置
//     const provideFn = app?.provide ?? (instance ? provide : void 0);  // 变量保存 provide 函数

//     // 如果 provideFn 不存在，发出警告并返回。
//     // 这确保 provideGlobalConfig 只能在组件的 setup 函数或 Vue 应用实例中使用
//     if (!provideFn) {
//         debugWarn(
//             "provideGlobalConfig",
//             "provideGlobalConfig() can only be used inside setup()"
//         );
//         return;
//     }

//     // 创建一个 context，它是 config 的 ref。
//     // 使用 watch 监听 config，当 config 变化时，合并旧配置和新配置，并更新 context.value
//     const context = ref(unref(config));
//     watch(
//         () => config,
//         (val) => {
//             const cfg = unref(val);
//             if (!oldCfg?.value) return cfg;
//             context.value = merge(oldCfg.value, cfg);
//         },
//         { deep: true }
//     );

//     // 创建一个 i18n 实例
//     // 监听 context 的变化，变化时，更新 i18n.value
//     const i18n = ref(_createI18n(context.value));
//     watch(
//         () => context.value,
//         (val) => (i18n.value = _createI18n(val)),
//         { deep: true }
//     );

//     provideFn(configProviderContextKey, context);
//     provideFn(i18nSymbol, i18n);

//     // 如果 app 存在，使用 app.use(i18n.value) 安装 i18n 插件。
//     // 如果 global 为 true 或者 globalConfig.value 不存在，将 globalConfig.value 设置为 context.value
//     if (app) app.use(i18n.value);
//     if (global || !globalConfig.value) globalConfig.value = context.value;

//     return context;
// }


// 下面测试就好些     上面是我加了注释  不知道为啥
import {
    ref,
    getCurrentInstance,
    inject,
    computed,
    provide,
    unref,
    watch,
} from "vue";
import type { MaybeRef, Ref, App } from "vue";
import {
    type ConfigProviderContext,
    configProviderContextKey,
} from "./constants";
import { createI18n, i18nSymbol } from "vue3-i18n";
import type { TranslatePair } from "@ui-library/locale";
import English from "@ui-library/locale/lang/en";
import { merge } from "lodash-es";
import { debugWarn } from "@ui-library/utils";

const globalConfig = ref<ConfigProviderContext>();

export function useGlobalConfig<
    K extends keyof ConfigProviderContext,
    D extends ConfigProviderContext[K],
>(key: K, defaultVal?: D): Ref<Exclude<ConfigProviderContext[K], void>>;
export function useGlobalConfig(): Ref<ConfigProviderContext>;
export function useGlobalConfig(
    key?: keyof ConfigProviderContext,
    defaultVal = void 0
) {
    const config = getCurrentInstance()
        ? inject(configProviderContextKey, globalConfig)
        : globalConfig;

    return key ? computed(() => config.value?.[key] ?? defaultVal) : config;
}

const _createI18n = (opts?: ConfigProviderContext) => {
    const mergeMsg = (msg: TranslatePair) =>
        merge(msg, opts?.extendsI18nMsg ?? {});

    if (!opts?.locale) {
        return createI18n({
            locale: "en",
            messages: mergeMsg({
                en: English.el,
            }),
        });
    }

    return createI18n({
        locale: opts.locale?.name || "en",
        messages: mergeMsg({
            en: English.el,
            [opts.locale?.name]: opts.locale?.el ?? {},
        }),
    });
};

export function provideGlobalConfig(
    config: MaybeRef<ConfigProviderContext> = { locale: English },
    app?: App,
    global = false
) {
    const instance = getCurrentInstance();
    const oldCfg = instance ? useGlobalConfig() : void 0;
    const provideFn = app?.provide ?? (instance ? provide : void 0);

    if (!provideFn) {
        debugWarn(
            "provideGlobalConfig",
            "provideGlobalConfig() can only be used inside setup()"
        );
        return;
    }

    const context = ref(unref(config));
    watch(
        () => config,
        (val) => {
            const cfg = unref(val);
            if (!oldCfg?.value) return cfg;
            context.value = merge(oldCfg.value, cfg);
        },
        { deep: true }
    );

    const i18n = ref(_createI18n(context.value));
    watch(
        () => context.value,
        (val) => (i18n.value = _createI18n(val)),
        { deep: true }
    );

    provideFn(configProviderContextKey, context);
    provideFn(i18nSymbol, i18n);

    if (app) app.use(i18n.value);
    if (global || !globalConfig.value) globalConfig.value = context.value;

    return context;
}