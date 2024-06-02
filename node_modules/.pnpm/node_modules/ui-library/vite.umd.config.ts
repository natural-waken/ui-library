import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";


export default defineConfig({
    plugins: [
        vue(),
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