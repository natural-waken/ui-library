/// <reference types="vitest" />
// 这条命令告诉 TypeScript 编译器在编译时引入 vitest 类型声明文件

import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    define: {
        PROD: JSON.stringify(false),
        DEV: JSON.stringify(false),
        TEST: JSON.stringify(true),
    },
    test: {
        globals: true,
        environment: "jsdom",
        exclude: [
            "**/node_modules/**",
            "**/dist/**",
            "**/true/coverage/**",
            "**/coverage/**"
        ],

        // 这个就是我们在运行所有测试用例之前去运行的文件
        setupFiles: [resolve(__dirname, "./vitest.setup.ts")]
    },

});