// 我们在这个里面存个常量  用来存依赖注入的 key
import type { InjectionKey } from "vue";  //  Vue 中导入的一个类型声明。它用于定义依赖注入的 key
import type { CollapseContext } from "./types";

export const COLLAPSE_CTX_KEY: InjectionKey<CollapseContext> =
    Symbol("collapseContext");

// 用于在组件树中共享数据。具体来说，这个 key 将用于注入和提供 ButtonGroupContext 类型的数据。