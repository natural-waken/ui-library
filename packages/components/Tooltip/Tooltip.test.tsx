import { describe, test, it, expect, vi, beforeEach } from "vitest";
import { withInstall } from "@ui-library/utils";
import { mount } from "@vue/test-utils";  // 对于入口的测试
import { LiTooltip } from "./index";

import Tooltip from "./Tooltip.vue";

vi.mock("@popperjs/core");

// 可见性变化
const onVisibleChange = vi.fn();


// 对于入口的测试
describe("Tooltip/index.ts", () => {
    // 测试 withInstall 函数是否被正确应用
    it("should be exported with withInstall()", () => {
        expect(LiTooltip.install).toBeDefined();
    });

    // 测试 Tooltip 组件是否被正确导出
    it("should be exported Tooltip component", () => {
        expect(LiTooltip).toBe(Tooltip);  // 看是否是同一个组件
    });

    // 可选：测试 withInstall 是否增强了 Tooltip 组件的功能
    test("should enhance Tooltip component", () => {
        const enhancedTooltip = withInstall(Tooltip);
        expect(enhancedTooltip).toBe(LiTooltip);
        // 这里可以添加更多测试，确保 withInstall 增强了组件的特定功能
    });

    // 可选：如果你的 withInstall 函数有特定的行为或属性，确保它们被正确应用
    test("should apply specific enhancements", () => {
        const enhancedTooltip = withInstall(Tooltip);
        // 例如，如果你的 withInstall 增加了一个特定的方法或属性
        expect(enhancedTooltip).toHaveProperty("install");
    });
});

describe("Tooltip.vue", () => {
    beforeEach(() => {
        // 就是在每个 test 之前    
        vi.useFakeTimers();
        vi.clearAllMocks()  // 把 mock 清空
    });

    // 在点击触发时，Tooltip 是否正确显示和隐藏
    test("basic tooltip", async () => {
        const wrapper = mount(
            () => (
                <div>
                    <div id="outside"></div>
                    <Tooltip
                        content="hello tooltip"
                        trigger="click"
                        {...{ onVisibleChange }}
                    >
                        <button id="trigger">trigger</button>
                    </Tooltip>
                </div>
            ),
            {
                attachTo: document.body,
            }
        );
        const triggerArea = wrapper.find("#trigger");
        expect(triggerArea.exists()).toBeTruthy();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeFalsy();

        // 弹出层是否出现
        triggerArea.trigger("click");
        await vi.runAllTimers();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeTruthy();
        expect(wrapper.get(".li-tooltip__popper").text()).toBe("hello tooltip");
        expect(onVisibleChange).toHaveBeenCalledWith(true);

        // 再次点击
        triggerArea.trigger("click");
        await vi.runAllTimers();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeFalsy();
        expect(onVisibleChange).toHaveBeenCalledTimes(2);

        // 等待动画
        await vi.runAllTimers();

        triggerArea.trigger("click");
        await vi.runAllTimers();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeTruthy();
        // 区域外点击关闭 tooltip
        wrapper.get("#outside").trigger("click");
        await vi.runAllTimers();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeFalsy();
        expect(onVisibleChange).toHaveBeenCalledTimes(4);

        // 注销流程
        wrapper.unmount();
    });

    // 验证了当鼠标悬停在触发区域时，Tooltip 是否正确显示，以及当鼠标移开时，Tooltip 是否正确隐藏
    test("tooltip with hover trigger", async () => {
        // ... 省略其他设置
        const wrapper = mount(Tooltip, {
            props: { trigger: "hover", content: "test" },
        });
        // 测试悬停显示
        wrapper.find(".li-tooltip__trigger").trigger("mouseenter");
        await vi.runAllTimers();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeTruthy();
        // 测试悬外隐藏
        wrapper.find(".li-tooltip").trigger("mouseleave");
        await vi.runAllTimers();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeFalsy();
    });

    // 右键菜单触发的测试   验证了在右键点击触发时，Tooltip 是否正确显示和隐藏
    test("tooltip with contextmenu trigger", async () => {
        // ... 省略其他设置
        const wrapper = mount(Tooltip, {
            props: { trigger: "contextmenu", content: "test" },
        });
        // 测试右键菜单显示
        wrapper.find(".li-tooltip__trigger").trigger("contextmenu");
        await vi.runAllTimers();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeTruthy();
        // 测试右键菜单隐藏（可以模拟点击外部区域）
    });

    // 手动模式的测试          验证了通过组件提供的方法手动显示和隐藏 Tooltip 的功能
    test("tooltip with manual trigger", async () => {
        // ... 省略其他设置
        let wrapper = mount(Tooltip, {
            props: { manual: true, content: "test" },
        });
        // 测试手动触发显示和隐藏
        wrapper.vm.show(); // 假设 show 方法可以通过某种方式访问
        await vi.runAllTimers();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeTruthy();
        wrapper.vm.hide();
        await vi.runAllTimers();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeFalsy();

        wrapper.setProps({ disabled: true });
        await vi.runAllTimers();
        wrapper.vm.show();
        await vi.runAllTimers();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeFalsy();
    });

    // 禁用状态的测试    验证了在禁用状态下，点击触发区域是否不会显示 Tooltip
    test("disabled tooltip", async () => {
        // ... 省略其他设置
        const wrapper = mount(Tooltip, {
            props: { disabled: true, content: "test" },
        });
        // 测试禁用状态下点击不会触发显示
        wrapper.find(".li-tooltip__trigger").trigger("click");
        await vi.runAllTimers();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeFalsy();
    });

    // 虚拟触发节点的测试   验证了虚拟节点事件（如 mouseenter 和 click）能否正确触发 Tooltip 的显示和隐藏
    test("tooltip with virtual trigger node", async () => {
        // ... 省略其他设置
        const virtualRef = document.createElement("div");
        let wrapper = mount(Tooltip, {
            props: { virtualRef, virtualTriggering: true },
        });
        // 测试虚拟节点的事件触发
        virtualRef.dispatchEvent(new Event("mouseenter"));  // 相当于是触发了  hover    
        await vi.runAllTimers();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeTruthy();
    });

    // 验证了从 hover 切换到 click 触发模式时的正确性，以及相应的事件处理是否正常
    test("change trigger prop", async () => {
        const wrapper = mount(Tooltip, {
            props: { trigger: "hover", content: "test" }
        });
        wrapper.setProps({ trigger: "click" });
        await vi.runAllTimers();
        wrapper.find(".li-tooltip__trigger").trigger("click");

        await vi.runAllTimers();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeTruthy();
        wrapper.find(".li-tooltip__trigger").trigger("click");

        await vi.runAllTimers();
        wrapper.find(".li-tooltip__trigger").trigger("hover");
        await vi.runAllTimers();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeFalsy();
    });

    // 验证了在 manual 和 trigger 属性更改后，Tooltip 是否按预期响应
    test("change manual prop", async () => {
        const wrapper = mount(Tooltip, {
            props: { trigger: "hover", content: "test" }
        });

        wrapper.setProps({ manual: true });
        await vi.runAllTimers();

        wrapper.find(".li-tooltip__trigger").trigger("hover");
        await vi.runAllTimers();

        expect(wrapper.find(".li-tooltip__popper").exists()).toBeFalsy();

        wrapper.setProps({ manual: false, trigger: "contextmenu" });
        await vi.runAllTimers();

        wrapper.find(".li-tooltip__trigger").trigger("contextmenu");
        await vi.runAllTimers();

        expect(wrapper.find(".li-tooltip__popper").exists()).toBeTruthy();
    });

    test("click-outside disabled when trigger prop is hover or manual mode", async () => {
        const wrapper = mount(
            () => (
                <div>
                    <div id="outside"></div>
                    <Tooltip
                        content="hello tooltip"
                        trigger="hover"
                        {...{ onVisibleChange }}
                    >
                        <button id="trigger">trigger</button>
                    </Tooltip>
                </div>
            ),
            {
                attachTo: document.body,
            }
        );

        const triggerArea = wrapper.find("#trigger");
        expect(triggerArea.exists()).toBeTruthy();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeFalsy();

        // 弹出层是否出现
        wrapper.find(".li-tooltip__trigger").trigger("mouseenter");
        await vi.runAllTimers();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeTruthy();

        // trigger:hover外层点击不触发
        wrapper.get("#outside").trigger("click");
        await vi.runAllTimers();
        expect(wrapper.find(".li-tooltip__popper").exists()).toBeTruthy();
        // 注销流程
        wrapper.unmount();
    })
});
