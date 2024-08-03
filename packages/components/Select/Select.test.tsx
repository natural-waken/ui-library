import { rAF } from "@ui-library/utils";
import { describe, test, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { SELECT_CTX_KEY } from "./constants";

import type { SelectOptionProps } from "./types";

import Select from "./Select.vue";
import Option from "./Option.vue";

describe("Select", () => {
    test("Select renders with default props", async () => {
        const wrapper = mount(Select, {
            props: {
                modelValue: "",
                options: [{ value: '1', label: "option 1" }],
            },
        });

        // 点击 弹出模拟框
        wrapper.find("input").trigger("click");
        await rAF();
        expect(wrapper.text()).toContain("option 1");
    });

    test('selects an option', async () => {
        const wrapper = mount(Select, {
            props: {
                modelValue: "",
                options: [{ value: '1', label: "option 1" }],
            },
        });

        wrapper.find("input").trigger("click");
        await rAF();
        const option = wrapper.findAll("li").at(0);
        await option?.trigger('click');

        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1']);
    });

    // 依赖注入的测试
    test("Option emits an event on click", async () => {
        // 上下文对象 ctx
        const ctx = {
            handleSelect: vi.fn(),
            selectState: {
                selectedOption: null,
                renderLabel: (props: SelectOptionProps) => `label: ${props.label}`
            }
        };
        // 使用 mount 函数挂载 Option 组件
        const wrapper = mount(Option, {
            // props: 传递给 Option 组件的属性，包括 value 和 label
            props: {
                value: '1',
                label: "option 1"
            },
            // global: 全局配置选项，用于依赖注入。通过 provide 选项，将 ctx 提供给 Option 组件。SELECT_CTX_KEY 是注入键
            global: {
                provide: {
                    [SELECT_CTX_KEY as any]: ctx
                }
            }
        });

        // 触发 Option 组件的点击事件
        await wrapper.trigger("click");
        expect(ctx.handleSelect).toHaveBeenCalled();  // 检查 ctx.handleSelect 是被调用
    });
})