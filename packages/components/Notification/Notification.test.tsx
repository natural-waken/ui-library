import { describe, test, expect } from "vitest";
import { notification } from "./methods";
import { rAF } from '@ui-library/utils'


// 获取指定元素的 top 样式属性值
function getTopValue(element: Element) {
    const styles = window.getComputedStyle(element);
    const topValue = styles.getPropertyValue("top");
    return Number.parseFloat(topValue);
}

describe("Notification", () => {
    test("notification() function", async () => {
        // 调用 notification 函数，显示消息 "hello msg"，持续时间为 0（永不自动关闭）。返回的 handler 用于控制该消息。
        const handler = notification({ message: "hello notify", duration: 0 });
        await rAF();
        expect(document.querySelector(".li-notification")).toBeTruthy();
        handler.close();  // 关闭消息
        await rAF();
        expect(document.querySelector(".li-notification")).toBeFalsy();  // 断言消息不存在
    });

    // 多次调用
    test("call notification() function more than once", async () => {
        // 分别显示两条消息 "hello msg" 和 "hello msg1"
        notification({ message: "hello notify", duration: 0 });
        notification({ message: "hello notify", duration: 0 });
        await rAF();
        expect(document.querySelectorAll(".li-notification").length).toBe(2);
        notification.closeAll();  // 关闭所有消息
        await rAF();
        expect(document.querySelectorAll(".li-notification").length).toBe(0);
    });

    test("notification offset", async () => {
        // 调用 message 设置偏移量
        notification({ message: "hello msg", duration: 0, offset: 100 });
        notification({ message: "hello msg", duration: 0, offset: 50 });
        await rAF();
        const elements = document.querySelectorAll(".li-notification");
        expect(elements.length).toBe(2);  // 断言两条消息存在

        // 断言消息位置
        expect(getTopValue(elements[0])).toBe(100);
        expect(getTopValue(elements[1])).toBe(150);
    });
});