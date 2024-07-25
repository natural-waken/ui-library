import { defineConfig } from "vitepress";
// import apiTable from "vitepress-api-table";

import {
    containerPreview,
    componentPreview,
} from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "UI-Library",
    base: '/ui-library/',   // 不加这个所有样式文件加载不出来   这个一定要和 github 仓库上的名字一样
    description: "仿 ElementPlus 组件库",
    appearance: false, // 关闭 darkMode @todo 深色模式完成后打开
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        // 首部导航
        nav: [
            { text: "开始使用", link: "/get-started" },
            { text: "组件", link: "/components/button" },
        ],
        search: {
            provider: "local",
        },
        // 左侧导航
        sidebar: [
            {
                text: "指南",
                collapsed: false,
                items: [{ text: "快速开始", link: "/get-started" }],
            },
            {
                text: "基础组件",
                collapsed: false,
                items: [
                    { text: "Button 按钮", link: "components/button" },
                    { text: "Collapse 折叠面板", link: "components/collapse" },
                    { text: "Dropdown 下拉菜单", link: "components/dropdown" },
                ],
            },
            {
                text: "反馈组件",
                collapsed: false,
                items: [
                    { text: "Alert 提示", link: "components/alert" },
                    { text: "Loading 加载", link: "components/loading" },
                    { text: "Message 消息提示", link: "components/message" },
                    { text: "MessageBox 消息弹出框", link: "components/messagebox" },
                    { text: "Notification 通知", link: "components/notification" },
                    { text: "Popconfirm 气泡确认框", link: "components/popconfirm" },
                    { text: "Tooltip 文字提示", link: "components/tooltip" },
                ],
            },
            // {
            //   text: "表单组件",
            //   collapsed: false,
            //   items: [{ text: "Form 表单", link: "components/form" }],
            // },
        ],

        socialLinks: [
            { icon: "github", link: "https://github.com/natural-waken/ui-library" },
        ],

    },
    markdown: {
        config(md) {
            md.use(containerPreview);
            md.use(componentPreview);
            // md.use(apiTable);
        },
    },
});