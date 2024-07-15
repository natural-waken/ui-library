import { isNumber, isString } from "lodash-es";  // 用于类型检查
import { debugWarn } from "./error";  // 用于调试警告

const SCOPE = "utils/style" as const;  // 定义常量 表示警告的作用域


// 辅助函数 用于检查一个字符串是否是有效的数字字符串
const isStringNumber = (val: string): boolean => {
    if (!isString(val)) {  // 如果传入的 val 不是字符串，返回 false
        return false;
    }

    // 如果 val 是字符串，尝试将其转换为数字并检查是否是 NaN，如果不是 NaN，则返回 true
    return !Number.isNaN(Number(val));
};


// 用于添加单位到值的工具函数 addUnit
export function addUnit(val?: string | number, defaultUnit = "px") {
    if (!val) return "";
    if (isNumber(val) || isStringNumber(val)) {  // 如果 val 是数字或有效的数字字符串，返回 val 加上 defaultUnit
        return `${val}${defaultUnit}`;
    }
    if (isString(val)) {  // 如果 val 是字符串，直接返回 val
        return val;
    }
    debugWarn(SCOPE, "binding value must be a string or number");
    // 如果 val 既不是数字也不是字符串，调用 debugWarn 函数输出调试警告，提示绑定值必须是字符串或数字
}