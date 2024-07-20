import MessageBox from "./methods";
import { set } from "lodash-es";

import type { App } from "vue";

export const LiMessageBox = MessageBox;

// 在 LiMessageBox 上添加 install 方法
set(LiMessageBox, "install", (app: App) => {
    // 在 Vue 实例的全局属性上添加 $msgbox、$messagebox、$alert、$confirm 和 $prompt 方法
    app.config.globalProperties.$msgbox = MessageBox;
    app.config.globalProperties.$messagebox = MessageBox;
    app.config.globalProperties.$alert = MessageBox.alert;
    app.config.globalProperties.$confirm = MessageBox.confirm;
    app.config.globalProperties.$prompt = MessageBox.prompt;
});

export default LiMessageBox;
export * from "./types";