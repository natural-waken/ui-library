import type { InjectionKey } from "vue";
import type { DropdownContext } from "./types";


// 依赖注入的 key
export const DROPDOWN_CTX_KEY: InjectionKey<DropdownContext> =
    Symbol("dropdownContext");