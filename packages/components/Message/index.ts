// 因为要在 this 上面挂载  $message
// 所以我们需要在 utils 里面再加个东西

import Message from "./methods";
import { withInstallFunction } from "@ui-library/utils";

export const LiMessage = withInstallFunction(Message, "$message");

export * from "./types";