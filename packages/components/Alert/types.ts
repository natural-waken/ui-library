export type AlertType = "success" | "info" | "warning" | "danger";

export interface AlertProps {
    title?: string;
    type?: AlertType;
    description?: string;  // 文字描述
    effect?: "light" | "dark";  // 主题明暗
    closable?: boolean;  // 是否可关闭
    center?: boolean;  // 文字居中
    showIcon?: boolean;  // 展示图标
}

export interface AlertEmits {
    (e: "close"): void;
}

export interface AlertInstance {
    open(): void;
    close(): void;
}