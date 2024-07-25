import { describe, it, expect } from "vitest";
import { Loading } from "./service";
import { rAF } from '@ui-library/utils'


describe("Loading", () => {
    it("should creat Loading instance", () => {
        const instance = Loading();
        expect(instance).toBeTruthy();
    });
    it('should render mask', async () => {
        Loading();
        await rAF();
        expect(document.querySelector('.li-loading__mask')).toBeTruthy()
    })

    // 测试 close 方法
    it('should close Loading and remove it from DOM', async () => {
        const instance = Loading();

        await rAF();
        expect(document.querySelector('.li-loading')).toBeTruthy()
        instance.close()
        await rAF();

        expect(document.querySelector('.li-loading')).toBeFalsy()
    })
});