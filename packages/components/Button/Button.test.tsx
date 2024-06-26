// 测试用例
// vitest  中 it 和 test 有什么区别
// 就是从功能上来说理解是一样的  只是语义上的区别
// 就像  test 我们用来测试个大的功能点   it 就是用来后面写着 should  比较细的个点

import { describe, it, expect, vi, test } from "vitest";
import { mount } from "@vue/test-utils";

import Button from "./Button.vue";
import Icon from "../Icon/Icon.vue";
import ButtonGroup from "./ButtonGroup.vue";
import { LiButton } from "./index";
import { withInstall } from "@ui-library/utils";


describe("Button.vue", () => {
    const onClick = vi.fn();
    test("basic button", async () => {
        const wrapper = mount(() => (
            <Button type="primary" {...{ onClick }}>
                button content
            </Button>
        ));

        // class
        expect(wrapper.classes()).toContain("li-button--primary");

        // slot
        expect(wrapper.get("button").text()).toBe("button content");

        // events
        await wrapper.get("button").trigger("click");
        expect(onClick).toHaveBeenCalledOnce();
    });

    test("disabled button", async () => {
        const wrapper = mount(() => (
            <Button disabled {...{ onClick }}>
                disabled button
            </Button>
        ));

        // class
        expect(wrapper.classes()).toContain("is-disabled");

        // attrs
        expect(wrapper.attributes("disabled")).toBeDefined();
        expect(wrapper.find("button").element.disabled).toBeTruthy();

        // events
        await wrapper.get("button").trigger("click");
        expect(onClick).toHaveBeenCalledOnce();
        expect(wrapper.emitted("click")).toBeUndefined();
    });

    test("loading button", () => {
        const wrapper = mount(Button, {
            props: {
                loading: true,
            },
            slots: {
                default: "loading button",
            },
            global: {
                stubs: ["LiIcon"],
            },
        });

        // class
        expect(wrapper.classes()).toContain("is-loading");

        // attrs
        expect(wrapper.attributes("disabled")).toBeDefined();
        expect(wrapper.find("button").element.disabled).toBeTruthy();

        // events
        wrapper.get("button").trigger("click");
        expect(wrapper.emitted()).not.toHaveProperty("click");

        // icon
        const iconElement = wrapper.findComponent(Icon);
        expect(iconElement.exists()).toBeTruthy();
        expect(iconElement.attributes("icon")).toBe("spinner");
    });

    test("icon button", () => {
        const wrapper = mount(Button, {
            props: {
                icon: "arrow-up",
            },
            slots: {
                default: "icon button",
            },
            global: {
                stubs: ["LiIcon"],
            },
        });

        const iconElement = wrapper.findComponent(Icon);
        expect(iconElement.exists()).toBeTruthy();
        expect(iconElement.attributes("icon")).toBe("arrow-up");
    });

    // Props: type
    it("should has the correct type class when type prop is set", () => {
        const types = ["primary", "success", "warning", "danger", "info"];
        types.forEach((type) => {
            const wrapper = mount(Button, {
                props: { type: type as any },
            });
            expect(wrapper.classes()).toContain(`li-button--${type}`);
        });
    });

    // Props: size
    it("should has the correct size class when size prop is set", () => {
        const sizes = ["large", "default", "small"];
        sizes.forEach((size) => {
            const wrapper = mount(Button, {
                props: { size: size as any },
            });
            expect(wrapper.classes()).toContain(`li-button--${size}`);
        });
    });

    // Props: plain, round, circle
    it.each([
        ["plain", "is-plain"],
        ["round", "is-round"],
        ["circle", "is-circle"],
        ["disabled", "is-disabled"],
        ["loading", "is-loading"],
    ])(
        "should has the correct class when prop %s is set to true",
        (prop, className) => {
            const wrapper = mount(Button, {
                props: { [prop]: true },
                global: {
                    stubs: ["LiIcon"],
                },
            });
            expect(wrapper.classes()).toContain(className);
        }
    );

    it("should has the correct native type attribute when native-type prop is set", () => {
        const wrapper = mount(Button, {
            props: { nativeType: "submit" },
        });
        expect(wrapper.element.tagName).toBe("BUTTON");
        expect((wrapper.element as any).type).toBe("submit");
    });

    // 测试用例关于节流的部分
    // Test the click event with and without throttle
    it.each([
        ["withoutThrottle", false],
        ["withThrottle", true],
    ])("emits click event %s", async (_, useThrottle) => {
        const clickSpy = vi.fn();
        const wrapper = mount(() => (
            <Button
                onClick={clickSpy}
                {...{
                    useThrottle,
                    throttleDuration: 400,
                }}
            />
        ));

        await wrapper.get("button").trigger("click");
        await wrapper.get("button").trigger("click");
        await wrapper.get("button").trigger("click");
        // expect(clickSpy).toHaveBeenCalled();
        // 三次点击  如果是节流模式  那么只生效一次
        expect(clickSpy).toBeCalledTimes(useThrottle ? 1 : 3);
    });

    // Props: tag
    it("should renders the custom tag when tag prop is set", () => {
        const wrapper = mount(Button, {
            props: { tag: "a" },
        });
        expect(wrapper.element.tagName.toLowerCase()).toBe("a");
    });

    // Events: click
    it("should emits a click event when the button is clicked", async () => {
        const wrapper = mount(Button, {});
        await wrapper.trigger("click");
        expect(wrapper.emitted().click).toHaveLength(1);
    });

    // loading  图标的测试用例
    // Exception Handling: loading state
    it("should display loading icon and not emit click event when button is loading", async () => {
        const wrapper = mount(Button, {
            props: { loading: true },
            global: {
                stubs: ["LiIcon"],
            },
        });
        const iconElement = wrapper.findComponent(Icon);

        expect(wrapper.find(".loading-icon").exists()).toBe(true);
        expect(iconElement.exists()).toBeTruthy();
        expect(iconElement.attributes("icon")).toBe("spinner");
        await wrapper.trigger("click");
        expect(wrapper.emitted("click")).toBeUndefined();
    });


});


describe("ButtonGroup.vue", () => {
    test("basic button group", async () => {
        const wrapper = mount(() => (
            <ButtonGroup>
                <Button>button 1</Button>
                <Button>button 2</Button>
            </ButtonGroup>
        ));

        expect(wrapper.classes()).toContain("li-button-group");
    });

    test("button group size", () => {
        const sizes = ["large", "default", "small"];
        sizes.forEach((size) => {
            const wrapper = mount(() => (
                <ButtonGroup size={size as any}>
                    <Button>button 1</Button>
                    <Button>button 2</Button>
                </ButtonGroup>
            ));

            const buttonWrapper = wrapper.findComponent(Button);
            expect(buttonWrapper.classes()).toContain(`li-button--${size}`);
        });
    });

    test("button group type", () => {
        const types = ["primary", "success", "warning", "danger", "info"];
        types.forEach((type) => {
            const wrapper = mount(() => (
                <ButtonGroup type={type as any}>
                    <Button>button 1</Button>
                    <Button>button 2</Button>
                </ButtonGroup>
            ));

            const buttonWrapper = wrapper.findComponent(Button);
            expect(buttonWrapper.classes()).toContain(`li-button--${type}`);
        });
    });

    test("button group disabled", () => {
        const wrapper = mount(() => (
            <ButtonGroup disabled>
                <Button>button 1</Button>
                <Button>button 2</Button>
            </ButtonGroup>
        ));

        const buttonWrapper = wrapper.findComponent(Button);
        expect(buttonWrapper.classes()).toContain(`is-disabled`);
    });
});


describe('Button/index', () => {
    it('should be exported with withInstall()', () => {
        expect(LiButton.install).toBeDefined();
    });

    it('component should be exported', () => {
        expect(LiButton).toBe(Button);
    });

    // 可选的测试用例，需要提供具体的上下文和实现
    it('should enhance Alert component', () => {
        const enhancedAlert = withInstall(Button);
        expect(enhancedAlert).toBe(LiButton);
    });

    // 另一个可选的测试用例，同样需要具体上下文
    it('should apply specific enhance', () => {
        const enhancedAlert = withInstall(Button);
        expect(enhancedAlert).toHaveProperty('install');
    });
});