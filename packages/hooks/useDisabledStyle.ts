import { each, isFunction, cloneDeep, assign } from "lodash-es";
import { watchEffect, useSlots, getCurrentInstance, type VNode } from "vue";

// 递归函数，用于遍历所有的 VNode 节点
// nodes：要遍历的节点数组     cb：对每个节点执行的回调函数
// 使用 each 函数遍历 nodes 数组，对每个 node 执行 cb 回调。
// 如果 node 有子节点，则递归调用 _dfs。
const _dfs = (nodes: VNode[], cb: (node: VNode) => void) =>
    each(nodes, (node) => {
        isFunction(cb) && cb(node);
        node.children && _dfs(node.children as VNode[], cb);
    });

export function useDisabledStyle() {
    const nodePropsMap = new Map();

    const instance = getCurrentInstance();
    const children = useSlots()?.default?.();

    // 监视 disabled 属性
    watchEffect(() => {
        // 如果 disabled 属性为 false，遍历 children。
        // 恢复每个节点的原始 props，如果 nodePropsMap 中有存储的 props
        if (!instance?.props.disabled) {
            _dfs(children ?? [], (node) => {
                if (!nodePropsMap.has(node)) return;
                node.props = nodePropsMap.get(node);
            });
            return;
        }
        // 为 true     遍历 children，如果节点有 props，则将其存储在 nodePropsMap 中
        // 使用 assign 函数将新的样式属性（光标不可用、文本颜色为占位符颜色）赋值给节点的 props
        _dfs(children ?? [], (node) => {
            if (!node?.props) return;

            nodePropsMap.set(node, cloneDeep(node.props));  // 先缓存下
            node.props = assign(node?.props, {
                style: {
                    cursor: "not-allowed",
                    color: "var(--er-text-color-placeholder)",
                },
            });
        });
    });
}

export default useDisabledStyle;