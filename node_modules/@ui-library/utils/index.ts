import { defineComponent } from "vue";
import { isFunction } from "lodash-es";

export const typeIconMap = new Map([
    ["info", "circle-info"],
    ["success", "check-circle"],
    ["warning", "circle-exclamation"],
    ["danger", "circle-xmark"],
    ["error", "circle-xmark"],
]);

// RenderVnode 的 Vue 组件，它用于渲染传入的 vNode
export const RenderVnode = defineComponent({
    props: {
        // 定义组件的属性 props，其中 vNode 是一个必需的属性，可以是 String、Object 或 Function 类型
        vNode: {
            type: [String, Object, Function],
            required: true,
        },
    },
    // setup 函数返回一个渲染函数，该函数根据 props.vNode 的类型来渲染对应的内容：
    // 如果 props.vNode 是函数类型（即 isFunction(props.vNode) 返回 true），则调用该函数并返回其结果。
    // 否则，直接返回 props.vNode
    setup(props) {
        return () => (isFunction(props.vNode) ? props.vNode() : props.vNode);
    },
});

export * from "./install";
export * from "./error";
export * from "./style";












