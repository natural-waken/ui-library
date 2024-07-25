import { describe, it, expect, vi } from "vitest";
import type { MessageBoxType } from "./types";
import MessageBox from "./methods";
import { rAF } from '@ui-library/utils'



describe("MessageBox Component", () => {
    // 测试是否可以正确渲染
    it("renders correctly", async () => {
        // 消息框的各种属性
        const props = {
            title: "Test Title",
            message: "Test Message",
            showClose: true,
            closeOnClickModal: true,
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel",
            showConfirmButton: true,
        };

        MessageBox(props);
        await rAF();  // 等待 DOM 更新
        const header = document.querySelector(".li-message-box__header");
        const title = document.querySelector(".li-message-box__title");
        const message = document.querySelector(".li-message-box__message");

        expect(title).toBeTruthy();
        expect(header).toBeTruthy();
        expect(message).toBeTruthy();  // 断言这些元素存在

        MessageBox.close();  // 关闭消息框
    });

    // 测试点击关闭按钮后消息框是否关闭
    it("closes on close button click", async () => {
        const props = {
            title: "Test Title",
            message: "Test Message",
            showClose: true,
        };

        const doAction = vi.fn();  // 使用 vi.fn() 创建一个模拟函数
        MessageBox(props).catch((action) => doAction(action));
        await rAF();

        const closeBtn = document.querySelector(
            ".li-message-box__header-btn"
        ) as HTMLButtonElement;
        closeBtn.click();  // 模拟点击关闭按钮

        await rAF();

        expect(doAction).toHaveBeenCalledWith("close");  // 断言 doAction 函数被调用，并传入 "close
    });

    // 测试点击确认按钮后消息框是否触发确认动作
    it("triggers confirm action on confirm button click", async () => {
        // 包含消息框的标题、消息、确认按钮和取消按钮
        const props = {
            title: "Test Title",
            message: "Test Message",
            showConfirmButton: true,
            showCancelButton: false,
        };

        const doAction = vi.fn();
        MessageBox(props)
            .then((action) => doAction(action))
        await rAF();

        const confirmBtn = document.querySelector(
            ".li-message-box__footer-btn"
        ) as HTMLButtonElement;
        confirmBtn.click();  // 模拟点击确认按钮
        await rAF();

        expect(doAction).toBeCalledWith('confirm');  // 断言 doAction 函数被调用，并传入 "confirm"

    });

    // 测试点击取消按钮后消息框是否触发取消动作
    it("triggers cancel action on cancel button click", async () => {
        const props = {
            title: "Test Title",
            message: "Test Message",
            showConfirmButton: true,
            showCancelButton: true,
        };

        const doAction = vi.fn();
        MessageBox(props).catch((action) => doAction(action));
        await rAF();

        const cancelBtn = document.querySelector(
            ".li-message-box__cancel-btn"
        ) as HTMLButtonElement;
        cancelBtn.click();  // 模拟点击取消按钮

        await rAF();

        expect(doAction).toHaveBeenCalledWith("cancel");
    });

    // 测试在提示模式下处理输入
    it("handles input in prompt mode", async () => {
        const props = {
            title: "Test Title",
            message: "Test Message",
            boxType: "prompt" as MessageBoxType,
            showInput: true,
        };

        const doAction = vi.fn();
        MessageBox(props).then((res) => doAction(res));
        await rAF();

        // 设置输入框的值为 "Test Input" 并触发 input 事件
        const input = document.querySelector("input") as HTMLInputElement;
        input.value = "Test Input";
        input.dispatchEvent(new Event("input"));

        const confirmBtn = document.querySelector(
            ".li-message-box__confirm-btn"
        ) as HTMLButtonElement;
        confirmBtn.click();  // 模拟点击确认按钮

        await rAF();

        // 断言 doAction 函数被调用，并传入包含 value 和 action 的对象
        expect(doAction).toHaveBeenCalledWith({
            value: "Test Input",
            action: "confirm",
        });
    });

});