import { describe, it, expect, vi } from "vitest";  // describe 用于定义测试套件，it 用于定义单个测试，expect 用于断言，vi 用于创建模拟函数
import type { AlertType } from "./types";
import { mount } from "@vue/test-utils";
import Alert from "./Alert.vue";
import Icon from "../Icon/Icon.vue";
import { LiAlert } from "./index";
import { withInstall } from "@ui-library/utils";

describe("Alert.vue", () => {
    // 定义两个常量 title 和 desc，它们将在多个测试中使用
    const title = "Test Alert" as const;
    const desc = "This is a test description" as const;
    it("should render the alert with default props", () => {
        const wrapper = mount(Alert, {
            props: {
                title,
            },
            slots: {
                default: desc,
            },
            global: {
                stubs: ["LiIcon"],
            },
        });
        expect(wrapper.text()).toContain(title);
        expect(wrapper.text()).toContain(desc);

        // close icon  右边的小叉号
        const iconElement = wrapper.findComponent(Icon);
        expect(iconElement.exists()).toBeTruthy();
        expect(iconElement.attributes("icon")).toBe("xmark");

        const wrapper2 = mount(() => (
            <Alert title={title} description={desc}></Alert>
        ));

        expect(wrapper2.text()).toContain(title);
        expect(wrapper2.text()).toContain(desc);
    });

    it.each([
        ["info", "circle-info"],
        ["success", "check-circle"],
        ["warning", "circle-exclamation"],
        ["danger", "circle-xmark"],
        ["error", "circle-xmark"],
        ["non-compliance", "circle-info"], // 不符合 type 定义的
    ])("should has the correct icon when props type is %s", (type, iconName) => {
        const wrapper = mount(Alert, {
            props: {
                title,
                closable: false,
                showIcon: true,
                type: type as AlertType,
            },
            slots: {
                default: desc,
            },
            global: {
                stubs: ["LiIcon"],
            },
        });

        const iconElement = wrapper.findComponent(Icon);
        expect(iconElement.exists()).toBeTruthy();
        expect(iconElement.attributes("icon")).toBe(iconName);
    });

    it("should emit close event when close icon is clicked", () => {
        const onClose = vi.fn();

        const wrapper = mount(Alert, {
            props: {
                title,
                closable: true,
                showIcon: false,
                onClose,
            },
            slots: {
                default: desc,
            },
            global: {
                stubs: ["LiIcon"],
            },
        });
        wrapper.findComponent(Icon).trigger("click");
        expect(onClose).toHaveBeenCalled();
    });

    it("should allow custom content via slots", () => {
        const wrapper = mount(Alert, {
            props: {
                title: "test title",
            },
            slots: {
                // 两个插槽的测试   插槽优先级大于 props   props 内容没有展示
                default: desc,
                title,
            },
        });
        expect(wrapper.text()).toContain(desc);
        expect(wrapper.text()).toContain(title);
        expect(wrapper.text()).not.toContain("test title");
    });

    it("should support centering text", () => {
        const wrapper = mount(Alert, {
            props: {
                title,
                description: desc,
                center: true,
            },
        });
        //class
        const rootNode = wrapper.find(".li-alert");
        expect(rootNode.classes()).toContain("text-center");  // 文字做居中
    });

    it("should not render close icon when closable is false", () => {
        const wrapper = mount(Alert, {
            props: { closable: false },
        });
        expect(wrapper.find(".li-alert__close").exists()).toBe(false);
    });

    it("should toggle visibility when open and close methods are called", async () => {
        const wrapper = mount(Alert, {
            props: { title, closable: false },
        });
        await wrapper.vm.close();
        expect(wrapper.find(".li-alert").attributes().style).toBe("display: none;");
        await wrapper.vm.open();
        expect(wrapper.find(".li-alert").attributes().style).toBe("");
    });
});

describe('Alert/index', () => {
    it('should be exported with withInstall()', () => {
        expect(LiAlert.install).toBeDefined();
    });

    it('component should be exported', () => {
        expect(LiAlert).toBe(Alert);
    });

    // 可选的测试用例，需要提供具体的上下文和实现
    it('should enhance Alert component', () => {
        const enhancedAlert = withInstall(Alert);
        expect(enhancedAlert).toBe(LiAlert);
    });

    // 另一个可选的测试用例，同样需要具体上下文
    it('should apply specific enhance', () => {
        const enhancedAlert = withInstall(Alert);
        expect(enhancedAlert).toHaveProperty('install');
    });
});