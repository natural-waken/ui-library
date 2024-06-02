import { isString } from "lodash-es";

// 定义我们自己的 error 类型
class LiUIError extends Error {
    // 调用了父类 Error 的构造函数，传入错误消息 message
    constructor(message: string) {
        super(message);
        this.name = "LiUIError";
    }
}
// 这个就相当于组件库 ui 上面的报错

// 抛出一个 LiUIError 类型的错误     scope 表示错误的作用域或范围，msg 表示错误消息  
export function throwError(scope: string, msg: string) {
    throw new LiUIError(`[${scope}] ${msg}`);  // 创建一个 LiUIError 类型的错误并抛出
}

export function debugWarn(error: Error): void;
export function debugWarn(scope: string, msg: string): void;
export function debugWarn(scope: string | Error, msg?: string) {
    // 非生产环境下输出警告信息
    if (process.env.NODE_ENV !== "production") {
        // 如果 scope 是字符串，则创建一个 LiUIError 类型的错误对象
        const err = isString(scope) ? new LiUIError(`[${scope}] ${msg}`) : scope;
        console.warn(err);
    }
}