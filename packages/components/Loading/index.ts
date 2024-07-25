import { vLoading } from "./directive";
import { Loading } from "./service";

import type { App } from "vue";

export const LiLoading = {
    name: 'LiLoading',
    install(app: App) {
        app.directive("loading", vLoading);
        app.config.globalProperties.$loading = Loading;
    },
    directive: vLoading,
    service: Loading,
};

export default LiLoading;

export {
    vLoading,
    vLoading as LiLoadingDirective,
    Loading as LiLoadingService,
};

export * from "./types";