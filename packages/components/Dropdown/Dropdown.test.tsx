import { describe, it, test, expect, vi, beforeEach } from "vitest";
import { withInstall } from "@ui-library/utils";
import { mount } from "@vue/test-utils";
import { LiDropdown, LiDropdownItem } from ".";
import type { DropdownItemProps } from "./types";

import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";

describe("Dropdown/index.ts", () => {
    // 测试 withInstall 函数是否被正确应用
    it("should be exported with withInstall()", () => {
        expect(LiDropdown.install).toBeDefined();
        expect(LiDropdownItem.install).toBeDefined();
    });

    // 测试 Dropdown 组件是否被正确导出
    it("should be exported Dropdown component", () => {
        expect(LiDropdown).toBe(Dropdown);
        expect(LiDropdownItem).toBe(DropdownItem);
    });

    // 可选：测试 withInstall 是否增强了 Tooltip 组件的功能
    test("should enhance Dropdown component", () => {
        const enhancedDropdown = withInstall(Dropdown);
        expect(enhancedDropdown).toBe(LiDropdown);
        // 这里可以添加更多测试，确保 withInstall 增强了组件的特定功能
    });

    // 可选：如果你的 withInstall 函数有特定的行为或属性，确保它们被正确应用
    test("should apply specific enhancements", () => {
        const enhancedDropdown = withInstall(Dropdown);
        // 例如，如果你的 withInstall 增加了一个特定的方法或属性
        expect(enhancedDropdown).toHaveProperty("install");
    });
});

describe("Dropdown.vue", () => {
    // 在每个测试之前执行，用于重置定时器和清除所有模拟。
    beforeEach(() => {
        vi.useFakeTimers(); // 使用假的定时器函数
        vi.clearAllMocks(); // 清除所有模拟函数
    });

    // 测试插槽是否正确渲染
    it("should render slots correctly", () => {
        const items: DropdownItemProps[] = [
            { label: "Item 1", command: 1 },
            { label: "Item 2", command: 2 },
        ];
        const wrapper = mount(Dropdown, {
            props: {
                trigger: "click",
            },
            slots: {
                default: () => <div>Default slot</div>, // 默认插槽内容
                dropdown: () => items.map((item) => <DropdownItem {...item} />), // dropdown 插槽内容
            },
        });

        expect(wrapper.text()).toContain("Default slot"); // 检查默认插槽内容是否正确渲染
        expect(wrapper.find(".li-dropdown").exists()).toBeTruthy(); // 检查 dropdown 组件是否存在
    });

    // 测试点击菜单项时是否发出命令事件
    it("should emit command event when item is clicked", async () => {
        // 定义两个菜单项，一个禁用，一个正常
        const items: DropdownItemProps[] = [
            { label: "Item 1", disabled: true }, // 第一个菜单项，禁用
            { label: "Item 2", command: "item2", divided: true }, // 第二个菜单项，有命令和分隔线
        ];

        const onCommand = vi.fn(); // 创建一个模拟函数，用于监听命令事件

        // 使用 mount 函数创建 Dropdown 组件实例  传入 props 和 slots
        const wrapper = mount(Dropdown, {
            props: {
                trigger: "click", // 设置触发方式为点击
                onCommand, // 传入监听命令事件的函数
            },
            slots: {
                default: () => <button id="trigger">Default slot content</button>, // 默认插槽内容
                dropdown: () => items.map((item) => <DropdownItem {...item} />), // 渲染 dropdown 插槽内容
            },
        });

        const triggerArea = wrapper.find("#trigger"); // 找到触发区域
        expect(triggerArea.exists()).toBeTruthy(); // 检查触发区域是否存在

        triggerArea.trigger("click"); // 模拟点击触发区域
        await vi.runAllTimers(); // 等待所有定时器执行

        expect(wrapper.find(".li-dropdown__menu").exists()).toBeTruthy(); // 检查菜单是否显示

        await wrapper.findAll("li").at(0)?.trigger("click"); // 点击第一个菜单项
        expect(onCommand).toBeCalledTimes(0); // 确认命令事件未发出，因为第一个菜单项被禁用

        await wrapper.findAll("li").at(2)?.trigger("click"); // 点击第二个菜单项
        expect(onCommand).toBeCalled(); // 确认命令事件被发出
        expect(onCommand).toBeCalledWith("item2"); // 确认命令事件参数正确
    });

    // 测试点击分割按钮时的可见性切换
    it("should toggle visibility when split btn is clicked", async () => {
        // 定义两个菜单项
        const items: DropdownItemProps[] = [
            { label: "Item 1" }, // 第一个菜单项
            { label: "Item 2", command: "item2" }, // 第二个菜单项，有命令
        ];

        const onClick = vi.fn(); // 创建一个模拟函数，用于监听点击事件

        // 使用 mount 函数创建 Dropdown 组件实例
        const wrapper = mount(Dropdown, {
            props: {
                trigger: "click", // 设置触发方式为点击
                splitButton: true, // 设置为分割按钮模式
                items, // 传入菜单项
                onClick, // 传入监听点击事件的函数
            },
            slots: {
                default: () => <div id="trigger">Default slot content</div>, // 默认插槽内容
            },
        });

        const triggerArea = wrapper.find("#trigger"); // 找到触发区域
        expect(triggerArea.exists()).toBeTruthy(); // 检查触发区域是否存在

        triggerArea.trigger("click"); // 模拟点击触发区域
        await vi.runAllTimers(); // 等待所有定时器执行

        expect(wrapper.find(".li-dropdown__menu").exists()).toBeFalsy(); // 检查菜单是否隐藏
        expect(onClick).toBeCalled(); // 确认点击事件被发出
    });
});
