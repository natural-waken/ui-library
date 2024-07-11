import { describe, expect, it, vi } from "vitest";
import { ref, defineComponent } from 'vue'
// 我们需要去创建个临时的组件
// 然后在内部去调用这个钩子  去测试这个行为符不符合预期

import { mount } from '@vue/test-utils'
import useEventListener from "../useEventListener";


describe("hooks/useEventListener", () => {
    // 测试两个点   首先这个点是传进去的 target 是我们的 html 结点
    it("should add and remove event listener when target is HTMLElement", async () => {
        const target = document.createElement("button");
        const handler = vi.fn(); // 使用 vitest 的 `fn` 来创建一个模拟函数
        const wrapper = mount(
            defineComponent({
                setup() {
                    useEventListener(target, "click", handler);
                    // 返回虚拟 dom 的写法
                    return () => <div id="container"></div>;
                },
            })
        );
        // 讲目标结点 button 添加到子节点
        wrapper.get("#container").element.appendChild(target);

        await target.click(); // 模拟点击事件
        expect(handler).toHaveBeenCalledOnce(); // 断言 handler 被调用了一次

        // 我们那个 hooks 里面有对卸载的处理  所以我们来写下
        await wrapper.unmount(); // 卸载组件
        await target.click(); // 再次模拟点击事件
        expect(handler).toHaveBeenCalledOnce(); // 断言 handler 仍然只被调用了一次
    });

    // 另个是首先这个点是传进去的 target 是我们 vue 中的 Ref
    it("should add and remove event listener when target is Ref<HTMLElement>", async () => {
        const target = ref<HTMLElement | void>();
        const handler = vi.fn();

        mount(
            defineComponent({
                setup() {
                    useEventListener(target, "click", handler); // 监听 target 的点击事件
                    return () => (
                        <button id="container" ref={target}>
                        </button>
                    );
                    // 将按钮元素的引用赋值给 target
                },
            })
        );

        await document.getElementById("container")?.click(); // 模拟点击 ID 为 "container" 的元素
        await target.value?.click(); // 如果 target 有值，模拟点击该元素

        expect(handler).toHaveBeenCalledOnce(); // 断言 handler 被调用了一次

        target.value = document.createElement("div"); // 将 target 的值更新为一个新的 div 元素
        await document.getElementById("container")?.click(); // 再次模拟点击 ID 为 "container" 的元素
        expect(handler).toHaveBeenCalledOnce(); // 断言 handler 仍然只被调用了一次
    });
});