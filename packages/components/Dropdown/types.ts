import type { VNode, ComputedRef } from "vue";
import type { TooltipProps } from "../Tooltip/types";
import type { ButtonType, ButtonSize } from "../Button/types";

export type DropdownCommand = string | number;  // 用于表示下拉菜单项的命令

export interface DropdownItemProps {  // 描述下拉菜单项的属性
    command?: DropdownCommand;
    label: string | VNode;
    disabled?: boolean;  // 表示菜单项是否禁用
    divided?: boolean;  // 表示菜单项是否有分割线
}

export interface DropdownProps extends TooltipProps {  // 描述下拉菜单组件的属性
    type?: ButtonType;
    size?: ButtonSize;
    items?: DropdownItemProps[];
    hideOnClick?: boolean;
    splitButton?: boolean;
}

export interface DropdownEmits {  // 描述下拉菜单组件的事件
    (e: "visible-change", value: boolean): void;  // 表示菜单的可见性变化，传递一个布尔值
    (e: "command", value: DropdownCommand): void;  // 表示菜单项被点击，传递一个 DropdownCommand
    (e: "click", value: MouseEvent): void;   // 表示菜单被点击，传递一个 MouseEvent 对象
}

export interface DropdownInstance {  // 描述下拉菜单组件实例的方法
    open(): void;  // 打开下拉菜单
    close(): void;
}

export interface DropdownContext {  // 描述下拉菜单组件的上下文
    handleItemClick(item: DropdownItemProps): void;
    size: ComputedRef<ButtonSize | void>;
}