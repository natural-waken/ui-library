import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import dts from 'vite-plugin-dts'
import { readdirSync } from "fs";
import { defer, delay, filter, map } from "lodash-es";
import shell from "shelljs";
import hooks from "./hooksPlugin";



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


// 同步获取指定路径下的所有子目录名称
// 读取指定路径下的所有子目录，并返回一个包含这些子目录名称的数组
function getDirectoriesSync(basePath: string) {  // 参数是要获取子目录的基础路径
    const entries = readdirSync(basePath, { withFileTypes: true });  // 读取指定路径下的所有文件和子目录  包含文件信息对象

    return map(
        filter(entries, (entry) => entry.isDirectory()),  // 过滤出所有表示目录的项
        (entry) => entry.name  // 从过滤后的每个元素中提取出目录名称
    );
}


// 尝试移动样式文件（.css 文件）到指定目录中
// 如果文件移动失败，会延迟一段时间后再次尝试移动
const TRY_MOVE_STYLES_DELAY = 800 as const;
function moveStyles() {
    try {
        readdirSync("./dist/es/theme")
        shell.cp("./dist/es/theme", "./dist");
    } catch (_) {
        delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    }
}

export default defineConfig({
    plugins: [
        vue(),
        dts({
            tsconfigPath: "../../tsconfig.build.json",
            outDir: "dist/types",  // 输出路径  类型文件
        }),
        hooks({
            rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
            afterBuild: moveStyles,
        }),
    ],
    build: {
        outDir: "dist/es",
        // minify: false,
        cssCodeSplit: true,
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
                    if (
                        chunkInfo.type === "asset" &&
                        /\.(css)$/i.test(chunkInfo.name as string)
                    ) {
                        // 打包路径  这里我们不使用 hash 了  theme/[name]-[hash].[ext]
                        return "theme/[name].[ext]";
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