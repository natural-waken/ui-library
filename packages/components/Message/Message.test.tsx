import { describe, test, expect } from "vitest";
import { message, closeAll } from "./methods";
import { rAF } from '@ui-library/utils'

// 获取指定元素的 top 样式属性值
function getTopValue(element: Element) {
    const styles = window.getComputedStyle(element);  // 获取元素的所有计算样式
    const topValue = styles.getPropertyValue("top");  // 从计算样式中获取 top 属性的值
    return Number.parseFloat(topValue);  // 转换为数字
}

describe("Message", () => {
    test("message() function", async () => {
        // 调用 message 函数，显示消息 "hello msg"，持续时间为 0（永不自动关闭）。返回的 handler 用于控制该消息。
        const handler = message({ message: "hello msg", duration: 0 });
        await rAF();  // 等待两次 requestAnimationFrame 循环完成，以确保消息被正确渲染。
        expect(document.querySelector(".li-message")).toBeTruthy();
        handler.close();  // 关闭消息
        await rAF();  // 再次等待两次 requestAnimationFrame 循环
        expect(document.querySelector(".li-message")).toBeFalsy();  // 断言消息不存在
    });

    test("call message() function more than once", async () => {
        // 分别显示两条消息 "hello msg" 和 "hello msg1"
        message({ message: "hello msg", duration: 0 });
        message({ message: "hello msg1", duration: 0 });
        await rAF();
        expect(document.querySelectorAll(".li-message").length).toBe(2);  // 断言两条消息存在
        closeAll();  // 关闭所有消息
        await rAF();
        expect(document.querySelector(".li-message")).toBeFalsy();
    });

    test("message offset", async () => {
        // 调用 message 设置偏移量
        message({ message: "hello msg", duration: 0, offset: 100 });
        message({ message: "hello msg", duration: 0, offset: 50 });

        await rAF();
        const elements = document.querySelectorAll(".li-message");
        expect(elements.length).toBe(2);  // 断言两条消息存在

        // 断言消息位置
        expect(getTopValue(elements[0])).toBe(100);
        expect(getTopValue(elements[1])).toBe(150);
    });
});
