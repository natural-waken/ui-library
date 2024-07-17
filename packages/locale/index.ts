export { default as en } from "./lang/en";
export { default as ja } from "./lang/ja";
export { default as ko } from "./lang/ko";
export { default as zhCn } from "./lang/zh-cn";
export { default as zhTw } from "./lang/zh-tw";

// element 里面的两个类型
export type TranslatePair = {
    [key: string]: string | string[] | TranslatePair;
};

export type Language = {
    name: string;
    el: TranslatePair;
};