import { describe, it, test, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { each, get } from "lodash-es";
import { LiPopconfirm } from ".";
import { withInstall } from "@ui-library/utils";
import type { PopconfirmProps } from "./types";

import PopConfirm from "./Popconfirm.vue";

// expect 如果这个条件为真，则测试通过；如果条件为假，则测试失败。

const onConfirm = vi.fn();
const onCancel = vi.fn();

describe("Popconfirm/index.ts", () => {
    // 测试 withInstall 函数是否被正确应用
    it("should be exported with withInstall()", () => {
        expect(LiPopconfirm.install).toBeDefined();  // 检查 LiPopconfirm 组件是否有 install 属性，确保 withInstall 函数已经被正确应用
    });

    // 测试 Popconfirm 组件是否被正确导出
    it("should be exported Popconfirm component", () => {
        expect(LiPopconfirm).toBe(PopConfirm);  // 检查 LiPopconfirm 是否等于 PopConfirm，确保组件被正确导出
    });

    // 可选：测试 withInstall 是否增强了 Popconfirm 组件的功能
    test("should enhance Popconfirm component", () => {
        const enhancedPopconfirm = withInstall(PopConfirm);  // 创建一个经过 withInstall 处理的 PopConfirm 组件实例
        expect(enhancedPopconfirm).toBe(LiPopconfirm);  // 检查 enhancedPopconfirm 是否等于 LiPopconfirm，确保 withInstall 增强了组件
    });

    // 可选：如果你的 withInstall 函数有特定的行为或属性，确保它们被正确应用
    test("should apply specific enhancements", () => {
        const enhancedPopconfirm = withInstall(PopConfirm);
        // 例如，如果你的 withInstall 增加了一个特定的方法或属性
        expect(enhancedPopconfirm).toHaveProperty("install");  // 检查 enhancedPopconfirm 是否有 install 属性，确保 withInstall 增加了特定的方法或属性
    });
});


describe("Popconfirm.vue", () => {
    // 把所有 prop 都测试遍
    const props = {
        title: "Test Title",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        confirmButtonType: "primary",
        cancelButtonType: "info",
        icon: "check-circle",
        iconColor: "green",
        hideIcon: false,
        hideAfter: 500,
        width: 200,
    } as PopconfirmProps;

    // 在每个测试之前使用假定时器并清除所有模拟函数
    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
    });

    // 1. 测试组件是否接受所有属性
    // 挂载 PopConfirm 组件并传递 props，然后遍历每个属性，检查组件是否正确接受并应用这些属性
    it("should accept all props", () => {
        const wrapper = mount(PopConfirm, {
            props,
        });

        // 遍历 props 对象，并确保传递给 PopConfirm 组件的每个属性都被正确接收
        each(props, (value, key) => {
            // 获取 key 值  
            // 检查从 wrapper.props() 中获取的属性值是否与 props 对象中的原始值相同
            expect(get(wrapper.props(), key)).toBe(value);
        });
    });

    // 2. 测试插槽内容是否正确渲染
    // 挂载 PopConfirm 组件并传递 props 和默认插槽内容，检查组件是否正确渲染插槽内容
    it("should render slot content correctly", () => {
        const slotContent = "Slot Content";
        const wrapper = mount(PopConfirm, {
            props,
            slots: {
                default: slotContent,
            },
        });

        expect(wrapper.text()).toContain(slotContent);
    });

    // 3. 测试 PopConfirm 组件的事件触发
    // 挂载组件并模拟用户交互，检查组件是否正确触发 onConfirm 和 onCancel 事件
    test("popconfirm emits", async () => {
        const wrapper = mount(() => (
            <div>
                <div id="outside"></div>
                <PopConfirm
                    title="Test Title"
                    hideIcon={true}
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                >
                    <button id="trigger">trigger</button>
                </PopConfirm>
            </div>
        ));

        const triggerNode = wrapper.find("#trigger");  // 查找触发按钮
        expect(triggerNode.exists()).toBeTruthy();  // 断言按钮存在

        triggerNode.trigger("click");  // 模拟用户点击触发按钮
        await vi.runAllTimers();  // 让所有定时器运行完成，以便模拟弹出框的动画或延迟效果

        expect(wrapper.find(".li-popconfirm").exists()).toBeTruthy();  // 检查弹出框是否显示
        const confirmBtn = wrapper.find(".li-popconfirm__confirm");  // 查找确认按钮
        expect(confirmBtn.exists()).toBeTruthy()  // 断言确认按钮存在

        confirmBtn.trigger("click");
        await vi.runAllTimers();
        expect(wrapper.find(".li-popconfirm").exists()).toBeFalsy();  // 断言弹出框元素不存在，确保点击确认按钮后弹出框隐藏
        expect(onConfirm).toBeCalled()  // 断言 onConfirm 回调被调用

        triggerNode.trigger("click");  // 再次模拟用户点击触发按钮
        await vi.runAllTimers();
        expect(wrapper.find(".li-popconfirm").exists()).toBeTruthy();

        const cancelBtn = wrapper.find(".li-popconfirm__cancel");  // 查找取消按钮
        expect(cancelBtn.exists()).toBeTruthy()

        cancelBtn.trigger("click");  // 模拟用户点击取消按钮
        await vi.runAllTimers();
        expect(wrapper.find(".li-popconfirm").exists()).toBeFalsy();  // 断言弹出框元素不存在，确保点击取消按钮后弹出框隐藏
        expect(onCancel).toBeCalled()
    });
    // 这段代码通过模拟用户交互，验证 PopConfirm 组件的行为是否符合预期，
    // 包括弹出框的显示与隐藏、以及确认和取消按钮的点击事件是否正确触发相应的回调。
});