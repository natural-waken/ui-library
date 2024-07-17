import type { Language, TranslatePair } from "@ui-library/locale";

export interface ConfigProviderProps {
    locale?: Language;
    extendsI18nMsg?: TranslatePair;
}