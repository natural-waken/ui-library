import { nextTick } from "vue";

// 异步函数，返回一个 Promise 对象
export const rAF = async () => {
    return new Promise((res) => {
        // requestAnimationFrame 用于在浏览器下次重绘之前执行一个函数
        requestAnimationFrame(() => {
            requestAnimationFrame(async () => {
                res(null);  // 调用 res(null) 解决 Promise，表示 Promise 完成
                await nextTick();  // 确保在下一个事件循环中执行
            });
        });
    });
};
