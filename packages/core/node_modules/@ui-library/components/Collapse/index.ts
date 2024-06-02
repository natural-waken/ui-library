import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
import { withInstall } from "../../utils/install";

export const LiCollapse = withInstall(Collapse)
export const LiCollapseItem = withInstall(CollapseItem)

export * from './types'