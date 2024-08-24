// 负责所有  vue  插件的安装

import type { App, Plugin } from "vue";
// import { each } from "lodash-es";

type SFCWithInstall<T> = T & Plugin;

// export function makeInstaller(components: Plugin[]) {
//     const install = (app: App) =>
//         each(components, (c) => {
//             app.use(c);
//         });

//     return install as Plugin;
// }


// 当你需要在 Vue 应用中注册一个组件时，可以使用这个函数。它会为组件添加一个 install 方法，允许你通过 app.use() 的方式在全局注册这个组件
export const withInstall = <T>(component: T) => {
    if (component) {//新加的

        (component as SFCWithInstall<T>).install = (app: App) => {
            const name = (component as any)?.name || "UnnamedComponent";
            app.component(name, component as SFCWithInstall<T>);
        };
    }
    return component as SFCWithInstall<T>;
};

// 这个就是两种引入方式  一个是全部引入  一个是按需引入



//  当你需要将一个工具函数（如消息提示、通知等）全局注册为 Vue 实例的属性时，可以使用这个函数。
export const withInstallFunction = <T>(fn: T, name: string) => {
    // 将函数 fn 类型断言为 SFCWithInstall<T>，然后为其添加一个 install 方法
    (fn as SFCWithInstall<T>).install = (app: App) => {
        // 将函数 fn 注册为 Vue 应用实例 app 的全局属性
        app.config.globalProperties[name] = fn;
    };
    // 返回带有 install 方法的函数 fn
    return fn as SFCWithInstall<T>;
};