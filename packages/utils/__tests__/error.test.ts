import { describe, expect, it, vi } from "vitest";
import { debugWarn, throwError, } from '../'

describe('error', () => {
    it('throwError should be worked', () => {
        expect(() => {
            throwError('scope', 'msg');
        }).toThrowError('[scope]:msg');
    });

    it('debugWarn should be worked', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => { });
        debugWarn('scope', 'msg');
        debugWarn(new SyntaxError('custom error'));

        expect(warn.mock.calls).toMatchInlineSnapshot(`
        [
          [
            [LiUIError: [scope]:msg],
          ],
          [
            [SyntaxError: custom error],
          ],
        ]
      `);
    });
});