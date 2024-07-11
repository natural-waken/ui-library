import { defineConfig } from "vite";
import { resolve } from "path";
import { readFile, readFileSync, readdirSync } from "fs";
import { compression } from "vite-plugin-compression2";
import { defer, delay } from "lodash-es";

import shell from "shelljs";
import vue from "@vitejs/plugin-vue";
import { hooksPlugin as hooks } from "@ui-library/vite-plugins";
import terser from '@rollup/plugin-terser'
import visualizer from "rollup-plugin-visualizer";


const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";


const TRY_MOVE_STYLES_DELAY = 800 as const;
// function moveStyles() {
//     try {
//         // 同步读取文件系统中的 ./dist/umd/index.css.gz 文件
//         readdirSync("./dist/umd/index.css.gz")
//         // 使用 shell.cp 命令将 ./dist/umd/index.css 文件复制到 ./dist/index.css
//         shell.cp("./dist/umd/index.css", "./dist/index.css");
//     } catch (_) {
//         // 延迟执行某个操作一段时间后再次尝试
//         delay(moveStyles, TRY_MOVE_STYLES_DELAY);
//     }
// }

function moveStyles() {
    readFile("./dist/umd/index.css.gz", (err) => {
        if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
        defer(() => shell.cp("./dist/umd/index.css", "./dist/index.css"));
    });
}


export default defineConfig({
    plugins: [
        vue(),
        compression({
            include: /.(cjs|css)$/i
        }),
        visualizer({
            filename: "dist/stats.umd.html",
        }),
        hooks({
            rmFiles: ["./dist/umd", "./dist/index.css", "./dist/stats.umd.html"],
            afterBuild: moveStyles,
        }),
        terser({
            compress: {
                drop_console: ["log"],
                drop_debugger: true,
                passes: 3,
                global_defs: {
                    "@DEV": JSON.stringify(isDev),
                    "@PROD": JSON.stringify(isProd),
                    "@TEST": JSON.stringify(isTest),
                },
            },
        }),
    ],
    build: {
        outDir: "dist/umd",  // 输出目录  在当前文件夹下建立 dist/umd
        lib: {
            entry: resolve(__dirname, "../index.ts"),  // 入口就是当前这个 index.ts
            name: "UiLibrary",
            fileName: "index",
            formats: ["umd"],
        },
        rollupOptions: {
            external: ["vue"],  // 将 vue 排除
            output: {
                exports: "named",
                globals: {
                    vue: "Vue",
                },
                assetFileNames: (chunkInfo) => {
                    // 需要将 style.css 改名为 index.css
                    if (chunkInfo.name === "style.css") {
                        return "index.css";
                    }
                    return chunkInfo.name as string;
                },
            },
        },
    },
});