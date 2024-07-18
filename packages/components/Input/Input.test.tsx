import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";  // 用于将 Vue 组件挂载到虚拟 DOM 中进行测试
import Input from "./Input.vue";

describe("Input.vue", () => {
    // 用于测试组件的渲染和初始状态
    // 使用 mount 函数挂载 Input 组件，并传入初始化的 props 和 slots。
    // 针对组件的动态类进行断言，例如检查是否包含特定的 CSS 类。
    // 针对标签和节点进行断言，例如检查是否正确渲染了 input 标签，并验证其属性。
    // 针对插槽内容进行断言，例如检查是否正确渲染了具名插槽的内容。
    test("render", () => {
        const wrapper = mount(Input, {
            props: {
                type: "text",
                size: "small",
                modelValue: "test",
            },
            slots: {
                prepend: "prepend",
                prefix: "prefix",
            },
        });
        // 针对动态 class 的测试         断言 wrapper.classes() 是否包含特定的 CSS 类名
        expect(wrapper.classes()).toContain("li-input");
        expect(wrapper.classes()).toContain("li-input--small");
        expect(wrapper.classes()).toContain("li-input--text");
        // 断言插槽内容 "prepend" 和 "prefix" 是否成功渲染并且正确地添加了相应的样式类
        expect(wrapper.classes()).toContain("is-prefix");
        expect(wrapper.classes()).toContain("is-prepend");

        // 是否正确渲染了 input 标签。
        // 使用 get 方法获取 input 标签，并验证其 type 属性是否为 "text
        expect(wrapper.find("input").exists()).toBeTruthy();
        expect(wrapper.get("input").attributes("type")).toBe("text");

        // 针对 slots 的测试
        // 使用 find 方法查找具有指定类名的元素，然后使用 exists 方法验证是否存在。
        // 使用 get 方法获取具有指定类名的元素，并验证其文本内容是否与预期的插槽内容匹配
        expect(wrapper.find(".li-input__prepend").exists()).toBeTruthy();
        expect(wrapper.get(".li-input__prepend").text()).toBe("prepend");

        expect(wrapper.find(".li-input__prefix").exists()).toBeTruthy();
        expect(wrapper.get(".li-input__prefix").text()).toBe("prefix");

        // 针对 v-if 的测试
        // 验证当 type 属性为 "textarea" 时，是否正确渲染了 textarea 元素
        const wrapper2 = mount(Input, {
            props: {
                type: "textarea",
                modelValue: "test",
            },
        });

        expect(wrapper2.find("textarea").exists()).toBeTruthy();
    });

    // 用于测试组件的双向绑定功能
    // 模拟输入框的值更新并检查是否触发了 input 和 change 事件。
    // 使用 await 等待 v-model 的异步更新，然后验证更新后的值是否正确。
    test("v-model", async () => {
        const wrapper: any = mount(Input, {
            props: {
                modelValue: "test",
                "onUpdate:modelValue": (e) => wrapper.setProps({ modelValue: e }),
                type: "text",
            },
        });
        //  断言初始时 input 元素的值是否为 "test"。
        // 使用 setValue 方法模拟用户输入 "test2"，并验证 input 元素的值是否更新为 "test2"。
        // 使用 expect 断言 wrapper 的 props 中 modelValue 是否更新为 "test2"，并验证 input 元素的值是否也为 "test2"
        const input = wrapper.get("input");
        // 初始值
        expect(input.element.value).toBe("test");
        // 更新值
        // setValue 会触发 input 和 change 事件
        await input.setValue("test2");
        expect(wrapper.props("modelValue")).toBe("test2");
        expect(input.element.value).toBe("test2");

        // 断言是否触发了 input 和 change 事件。    使用 emitted 方法获取已触发的所有事件。
        // 使用 emitted("input") 和 emitted("change") 分别获取 input 和 change 事件的触发详情。
        // 使用 toEqual 方法验证 inputEvent 和 changeEvent 的第一个触发参数是否分别为 ["test2"]，表示输入框的新值
        expect(wrapper.emitted()).toHaveProperty("input");
        expect(wrapper.emitted()).toHaveProperty("change");

        const inputEvent = wrapper.emitted("input");
        const changeEvent = wrapper.emitted("change");

        expect(inputEvent![0]).toEqual(["test2"]);
        expect(changeEvent![0]).toEqual(["test2"]);

        // 验证 v-model 异步更新
        // 模拟异步更新 modelValue 的值为 "test3"。
        // 断言 input 元素的值是否成功更新为 "test3"
        await wrapper.setProps({ modelValue: "test3" });
        expect(input.element.value).toBe("test3");
    });

    // 用于测试组件的清除功能
    // 在 global 选项中设置 Icon 组件为存根，避免实际渲染依赖。
    // 验证在输入框聚焦时是否显示了清除按钮，并模拟点击清除按钮后验证是否正确触发了 clear、input 和 change 事件
    test("clearable", async () => {
        const wrapper = mount(Input, {
            props: {
                modelValue: "test",
                clearable: true,
                type: "text",
            },
            global: {
                stubs: ["Icon"],
            },
        });

        // 不应该出现 Icon 区域    初始状态下不应该显示清除按钮
        expect(wrapper.find(".li-input__clear").exists()).toBeFalsy();
        // 使用 trigger 方法模拟 focus 事件，使输入框获得焦点     断言 focus 事件是否被正确触发
        const input = wrapper.get("input");
        await input.trigger("focus");
        expect(wrapper.emitted()).toHaveProperty("focus");  // 

        // 出现 Icon 区域    在输入框获得焦点后应该显示清除按钮
        expect(wrapper.find(".li-input__clear").exists()).toBeTruthy();

        // 点击 Icon 区域，触发 clear 事件
        await wrapper.get(".li-input__clear").trigger("click");   // 模拟 click 事件，触发清除按钮的点击
        expect(wrapper.emitted()).toHaveProperty("clear");  // 断言是否触发了 clear 事件

        expect(wrapper.emitted()).toHaveProperty("input");
        expect(wrapper.emitted()).toHaveProperty("change");  // 断言是否同时触发了 input 和 change 事件

        const inputEvent = wrapper.emitted("input");
        const changeEvent = wrapper.emitted("change");
        // 使用 emitted 方法获取 input 和 change 事件的触发详情，并使用 toEqual 方法验证事件参数是否为空字符串 [""]，表示输入框被清空
        expect(inputEvent![0]).toEqual([""]);
        expect(changeEvent![0]).toEqual([""]);
        expect(input.element.value).toBe("");

        await input.trigger("blur");  // input 元素的值是否为空字符串
        expect(wrapper.emitted()).toHaveProperty("blur");  // 模拟 blur 事件，验证是否触发了 blur 事件
    });

    // 用于测试密码输入框的显示密码功能。
    // 验证密码输入框初始为密码类型，然后模拟点击显示密码图标切换是否正确显示为文本类型，并再次点击切换回密码类型
    test("toggle password", async () => {
        const wrapper = mount(Input, {
            props: {
                modelValue: "",
                type: "password",
                showPassword: true,
            },
            global: {
                stubs: ["Icon"],
            },
        });

        // 不应该出现 Icon 区域         初始状态下不应该显示密码切换图标
        expect(wrapper.find(".li-input__password").exists()).toBeFalsy();
        const input = wrapper.get("input");
        // 获取 input 元素，并使用 setValue 方法模拟用户输入密码 "123"
        expect(input.element.type).toBe("password");  // 断言 input 元素的 type 属性是否为 "password"，表示密码输入框状态
        await input.setValue("123");

        // 查找具有 .li-input__password 类名的元素，并使用 exists 方法验证是否存在密码切换图标
        // 断言 eyeIcon 存在，并且它的 icon 属性是否为 "eye-slash"，表示当前为隐藏密码状态
        const eyeIcon = wrapper.find(".li-input__password");
        expect(eyeIcon.exists()).toBeTruthy();
        expect(eyeIcon.attributes("icon")).toBe("eye-slash");

        // 点击 切换
        // 模拟点击 eyeIcon，即密码切换图标，触发切换显示密码的操作
        // 断言 input 元素的 type 属性是否为 "text"，表示当前为显示密码状态
        await eyeIcon.trigger("click");
        expect(input.element.type).toBe("text");
        // 缓存 Icon
        // 使用 attributes 方法验证其 icon 属性是否为 "eye"，表示切换后的密码显示状态
        expect(wrapper.find(".li-input__password").attributes("icon")).toBe("eye");
    });
});