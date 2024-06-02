import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import dts from 'vite-plugin-dts'
import { readdirSync } from "fs";
import { filter, map } from "lodash-es";

// 我们将所有组件定义成个数组
const COMP_NAMES = [
    "Alert",
    "Button",
    "Collapse",
    "Dropdown",
    "Form",
    "Icon",
    "Input",
    "Loading",
    "Message",
    "MessageBox",
    "Notification",
    "Overlay",
    "Popconfirm",
    "Select",
    "Switch",
    "Tooltip",
    "Upload"
] as const;

function getDirectoriesSync(basePath: string) {
    const entries = readdirSync(basePath, { withFileTypes: true });

    return map(
        filter(entries, (entry) => entry.isDirectory()),
        (entry) => entry.name
    );
}


export default defineConfig({
    plugins: [
        vue(),
        dts({
            tsconfigPath: "../../tsconfig.build.json",
            outDir: "dist/types",  // 输出路径  类型文件
        })
    ],
    build: {
        outDir: "dist/es",
        lib: {
            entry: resolve(__dirname, "./index.ts"),
            name: "UiLibrary",
            fileName: "index",
            formats: ["es"],
        },
        rollupOptions: {
            external: [
                "vue",
                "@fortawesome/fontawesome-svg-core",
                "@fortawesome/free-solid-svg-icons",
                "@fortawesome/vue-fontawesome",
                "@popperjs/core",
                "async-validator",
            ],
            output: {
                assetFileNames: (chunkInfo) => {
                    // 需要将 style.css 改名为 index.css
                    if (chunkInfo.name === "style.css") {
                        return "index.css";
                    }
                    return chunkInfo.name as string;
                },

                // 分包相关
                manualChunks(id) {
                    // 如果包含这个  说明是第三方库引入  就命名到 vendor 分包
                    if (id.includes("node_modules")) {
                        return "vendor";
                    }
                    if (id.includes("/packages/hooks")) {
                        return "hooks";
                    }
                    if (
                        id.includes("/packages/utils") ||
                        id.includes("plugin-vue:export-helper")
                    ) {
                        return "utils";
                    }
                    // getDirectoriesSync("../components")
                    // 遍历所有组件名字   及那个每个组件分包
                    for (const item of getDirectoriesSync("../components")) {
                        if (id.includes(`/packages/components/${item}`)) {
                            return item;
                        }
                    }
                },
            },
        },
    },
});