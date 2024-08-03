import Select from "./Select.vue";
import Option from "./Option.vue";
import { withInstall } from "@ui-library/utils";

export const LiSelect = withInstall(Select);
export const LiOption = withInstall(Option);

export * from "./types";