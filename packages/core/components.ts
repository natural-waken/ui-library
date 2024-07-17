// import { LiButton } from "@ui-library/components";
// import { LiIcon } from "@ui-library/components";
// import { LiButtonGroup } from "@ui-library/components";
// import { LiCollapse, LiCollapseItem, LiAlert, LiTooltip } from "@ui-library/components";
import { LiButton } from "../components";
import { LiIcon } from "../components";
import { LiButtonGroup } from "../components";
import { LiCollapse, LiCollapseItem, LiAlert, LiTooltip, LiPopconfirm, LiDropdown, LiDropdownItem, LiMessage } from "../components";
import type { Plugin } from "vue";

// 这个里面的东西是为了我们在运用的时候  去 use  我们组件库   把这些组件注册到 vue app 实例上面   我们就可以直接不用引入
export default [
    LiButton,
    LiButtonGroup,
    LiIcon,
    LiCollapse,
    LiCollapseItem,
    LiAlert,
    LiTooltip,
    LiPopconfirm,
    LiDropdown,
    LiDropdownItem,
    LiMessage
] as Plugin[]

