import { describe, expect, it, vi } from "vitest";
import { ref, defineComponent } from 'vue'
import { mount } from '@vue/test-utils'

import useClickOutside from "../useClickOutside";


describe('hooks/useClickOutside', () => {
    it('should add "click-outside" listener', async () => {
        const target = ref<HTMLElement>();
        const btnRef = ref<HTMLElement>();
        const handler = vi.fn(); // 使用 vitest 的 `fn` 创建模拟函数

        mount(
            defineComponent({
                setup() {
                    useClickOutside(target, handler); // 假设 useClickOutside 是一个自定义的组合式函数
                    return () => (
                        <div ref={target}>
                            <button ref={btnRef}>click me</button>
                        </div>
                    );
                },
            })
        );

        // 模拟点击按钮
        await btnRef.value?.click();
        // 期望 handler 没有被调用，因为点击在目标元素内部
        expect(handler).not.toHaveBeenCalled();

        // 模拟点击页面其他区域
        await document.body.click();
        expect(handler).toHaveBeenCalled();
    });
});