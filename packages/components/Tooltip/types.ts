import type { Placement, Options } from "@popperjs/core";

export interface TooltipProps {
    content?: string;
    trigger?: "hover" | "click" | "contextmenu";  // 触发工具提示显示的方式  鼠标悬停 点击 右键菜单
    placement?: Placement;  // 工具提示的位置，使用了 Placement 类型，通常是由外部库 @popperjs/core 提供的位置枚举类型
    manual?: boolean;  // 是否手动控制工具提示的显示隐藏
    disabled?: boolean;  // 是否禁用工具提示
    popperOptions?: Partial<Options>;
    transition?: string;  // 过渡效果
    showTimeout?: number;
    hideTimeout?: number;  // 隐藏工具提示前的延迟时间
}

export interface TooltipEmits {
    (e: "visible-change", value: boolean): void;  // 可见性发生变化时触发
    (e: "click-outside"): void;  // 点击工具提示以外的区域时触发
}

export interface TooltipInstance {
    show(): void;
    hide(): void;
}