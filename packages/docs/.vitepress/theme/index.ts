import DefaultTheme from "vitepress/theme";
import { type App } from "vue";
import UiLibrary from "ui-library";
import { ElementPlusContainer } from "@vitepress-preview/component";

import "@vitepress-preview/component/style.css";
import 'ui-library/dist/index.css'

export default {
    ...DefaultTheme,
    enhanceApp({ app }: { app: App }) {
        app.component("demo-preview", ElementPlusContainer);
        app.use(UiLibrary);
    },
}