
// import { describe, it, expect } from "vitest";
// import { mount } from "@vue/test-utils";
// import Switch from "./Switch.vue";

// describe("Switch.vue", () => {
//     // Switch 组件是否正确渲染
//     it("should render correctly", () => {
//         const wrapper = mount(Switch);
//         expect(wrapper.find(".li-switch")).toBeTruthy();
//     });

//     // 组件的点击事件是否能够切换 checked 状态
//     it("should handle click event and toggle the checked state", async () => {
//         const wrapper = mount(Switch, {
//             props: {
//                 modelValue: false,
//             },
//         });

//         await wrapper.trigger("click");
//         expect(wrapper.emitted()["update:modelValue"][0]).toEqual([true]);
//         expect(wrapper.emitted()["change"][0]).toEqual([true]);

//         // 再次触发 click 事件
//         await wrapper.trigger("click");
//         expect(wrapper.emitted()["update:modelValue"][1]).toEqual([false]);
//         expect(wrapper.emitted()["change"][1]).toEqual([false]);
//     });

//     // 当组件被禁用时不应触发切换操作
//     it("should not toggle when disabled", async () => {
//         const wrapper = mount(Switch, {
//             props: {
//                 modelValue: false,
//                 disabled: true,
//             },
//         });

//         await wrapper.trigger("click");
//         expect(wrapper.emitted()).not.toHaveProperty("update:modelValue");
//         expect(wrapper.emitted()).not.toHaveProperty("change");
//         // 断言 emitted 对象中没有 update:modelValue 事件。
//         // 断言 emitted 对象中没有 change 事件
//     });
// });

import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Switch from "./Switch.vue";

describe("Switch.vue", () => {
    it("should render correctly", () => {
        const wrapper = mount(Switch);
        expect(wrapper.find(".li-switch")).toBeTruthy();
    });
    it("should handle click event and toggle the checked state", async () => {
        const wrapper = mount(Switch, {
            props: {
                modelValue: false,
            },
        });

        await wrapper.trigger("click");
        expect(wrapper.emitted()["update:modelValue"][0]).toEqual([true]);
        expect(wrapper.emitted()["change"][0]).toEqual([true]);

        await wrapper.trigger("click");
        expect(wrapper.emitted()["update:modelValue"][1]).toEqual([false]);
        expect(wrapper.emitted()["change"][1]).toEqual([false]);
    });

    it("should not toggle when disabled", async () => {
        const wrapper = mount(Switch, {
            props: {
                modelValue: false,
                disabled: true,
            },
        });

        await wrapper.trigger("click");
        expect(wrapper.emitted()).not.toHaveProperty("update:modelValue");
        expect(wrapper.emitted()).not.toHaveProperty("change");
    });
});