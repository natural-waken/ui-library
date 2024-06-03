import { defineConfig } from "vite";
import { resolve } from "path";
import { readFileSync } from "fs";

import vue from "@vitejs/plugin-vue";
import { compression } from "vite-plugin-compression2";
import { delay } from "lodash-es";
import shell from "shelljs";
import hooks from "./hooksPlugin";



const TRY_MOVE_STYLES_DELAY = 800 as const;
function moveStyles() {
    try {
        // 同步读取文件系统中的 ./dist/umd/index.css.gz 文件
        readFileSync("./dist/umd/index.css.gz")
        // 使用 shell.cp 命令将 ./dist/umd/index.css 文件复制到 ./dist/index.css
        shell.cp("./dist/umd/index.css", "./dist/index.css");
    } catch (_) {
        // 延迟执行某个操作一段时间后再次尝试
        delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    }
}


export default defineConfig({
    plugins: [
        vue(),
        compression({
            include: /.(cjs|css)$/i
        }),
        hooks({
            rmFiles: ["./dist/umd", "./dist/index.css"],
            afterBuild: moveStyles,
        }),
    ],
    build: {
        outDir: "dist/umd",  // 输出目录  在当前文件夹下建立 dist/umd
        lib: {
            entry: resolve(__dirname, "./index.ts"),  // 入口就是当前这个 index.ts
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