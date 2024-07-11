import { each, isFunction } from "lodash-es";
import shell from "shelljs";
function hooksPlugin({
  rmFiles = [],
  // 字符串数组，包含要在构建开始时删除的文件或目录路径
  afterBuild,
  // 构建完成后的回调函数（可选）
  beforeBuild
  // 构建开始前的回调函数（可选）
}) {
  return {
    name: "hooks-plugin",
    // 插件名字
    // vite 官方的两个生命周期钩子
    buildStart() {
      each(rmFiles, (fName) => shell.rm("-rf", fName));
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err) {
      !err && isFunction(afterBuild) && afterBuild();
    }
  };
}
export {
  hooksPlugin
};
