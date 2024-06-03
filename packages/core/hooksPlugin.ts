import { each, isFunction } from "lodash-es";  // each 用于遍历数组或对象，isFunction 用于检查一个值是否是函数
import shell from "shelljs";

export default function hooksPlugin({
    rmFiles = [],  // 字符串数组，包含要在构建开始时删除的文件或目录路径
    afterBuild,  // 构建完成后的回调函数（可选）
    beforeBuild,  // 构建开始前的回调函数（可选）
}: {
    beforeBuild?: Function;
    afterBuild?: Function;
    rmFiles?: string[];
}) {
    return {
        name: "hooks-plugin",  // 插件名字
        // vite 官方的两个生命周期钩子
        buildStart() {
            each(rmFiles, (fName) => shell.rm("-rf", fName));  // 遍历 rmFiles 数组，使用 shell.rm 删除每个文件或目录
            isFunction(beforeBuild) && beforeBuild();  // 如果 beforeBuild 是一个函数，则调用它
        },
        buildEnd(err?: Error) {  // 构建结束时调用的钩子函数   err  构建过程中产生的错误（如果有）
            !err && isFunction(afterBuild) && afterBuild();  // 如果没有错误且 afterBuild 是一个函数，则调用 afterBuild
        },
    };
}