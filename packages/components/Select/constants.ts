import type { InjectionKey } from "vue";  // 用于 Vue 3 中依赖注入系统的类型
import type { SelectContext } from "./types";

// 用作注入和提供 SelectContext 的键
export const SELECT_CTX_KEY: InjectionKey<SelectContext> =
    Symbol("selectContext");

// 常量配置了用于 Popper.js 的选项
export const POPPER_OPTIONS: any = {
    // 两个修饰符
    modifiers: [
        {
            name: "offset",  // 设置 Popper 相对于参考元素的偏移量
            options: {
                offset: [0, 9],  // 垂直方向上偏移 9 px
            },
        },
        {
            // 确保 Popper 的宽度与其参考元素的宽度相同
            name: "sameWidth",
            enabled: true,
            // 修饰符的主要函数，接收一个参数 state，用于访问 Popper 的状态。在这个函数中，将 Popper 的宽度设置为其参考元素的宽度。
            fn: ({ state }: { state: any }) => {
                state.styles.popper.width = `${state.rects.reference.width}px`;
            },
            // 指定修饰符在 Popper.js 的哪个阶段执行
            phase: "beforeWrite",
            //  指定此修饰符依赖于 computeStyles 修饰符
            requires: ["computeStyles"],
        },
    ],
} as const;