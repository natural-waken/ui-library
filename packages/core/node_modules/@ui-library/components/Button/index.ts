import Button from "./Button.vue";
import ButtonGroup from "./ButtonGroup.vue";
import { withInstall } from "../../utils/install";

export const LiButton = withInstall(Button)
export const LiButtonGroup = withInstall(ButtonGroup)

export * from './types'