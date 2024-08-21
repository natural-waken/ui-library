import Form from "./Form.vue";
import FormItem from "./FormItem.vue";

import { withInstall } from "@ui-library/utils";

export const LiForm = withInstall(Form);
export const LiFormItem = withInstall(FormItem);

export * from "./types";
export * from "./hooks";
// 这样我们就可以在外面用了  去 input 里面使用下