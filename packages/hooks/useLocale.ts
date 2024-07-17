import { inject, ref, unref, computed, type Ref } from "vue";
import { omit } from "lodash-es";  // 排除掉 i18n 的 install   用不到
import { createI18n, i18nSymbol, type I18nInstance } from "vue3-i18n";
import type { Language } from "@ui-library/locale";
import English from "@ui-library/locale/lang/en";

// 用于从国际化实例对象中删除 install 属性     install 属性是 Vue 插件的安装函数，在这里不需要
const omitInstall = (obj: I18nInstance) => omit(obj, "install");

// 用于设置和管理应用程序的国际化（i18n）
// 如果 localeOverrides 被传入，函数将使用它来覆盖默认的语言设置
// 如果 localeOverrides 没有传入，函数首先尝试使用 inject 从依赖注入系统中获取 i18n 实例
export function useLocale(localeOverrides?: Ref<Language>) {
    // a. 默认语言设置
    if (!localeOverrides) {
        // 尝试从依赖注入系统中获取 i18n 实例
        // 如果 inject 返回 null 或 undefined，也就是没取出来，它会创建一个新的 i18n 实例，默认语言设置为英语
        const i18n: Ref<I18nInstance> =
            inject(i18nSymbol) ??
            ref(createI18n({ locale: English.name, messages: { en: English.el } }));

        return computed(() => omitInstall(unref(i18n)));  // 它返回不包含 install 属性的 i18n 实例
    }

    return computed(() =>
        omitInstall(
            // 创建一个新的 i18n 实例
            createI18n({
                locale: localeOverrides.value.name,
                // messages 对象包含英语翻译和覆盖语言的翻译。
                messages: {
                    en: English.el,
                    [localeOverrides.value.name]: localeOverrides.value.el,
                },
            })
        )
    );
}

export default useLocale;