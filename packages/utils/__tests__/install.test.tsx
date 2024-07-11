import { describe, expect, it } from "vitest";
import { mount } from '@vue/test-utils'
import { defineComponent, createApp } from "vue";
import { withInstall, makeInstaller } from "../install";

const AppComp = defineComponent({
    setup() {
        return () => <div>App</div>;
    }
});

const compA = withInstall(defineComponent({
    name: 'CompA',
    setup() {
        return () => <div>CompA</div>;
    }
}));

const compB = withInstall(defineComponent({
    name: 'CompB',
    setup() {
        return () => <div>CompB</div>;
    }
}));

// 我们使用 makeInstall 生成个 install  然后在我们什么这个 app 上面 use
describe('install', () => {
    it('withInstall should be worked', () => {
        const wrapper = mount(() => <div id="app"></div>);
        const app = createApp(AppComp);

        app.use(compA).use(compB).mount(wrapper.element);

        expect(compA.install).toBeDefined();
        expect(compB.install).toBeDefined();
        expect(app._context.components['CompA']).toBeTruthy();
        expect(app._context.components['CompB']).toBeTruthy();
    });

    it('makeInstaller should be worked', () => {
        const wrapper = mount(() => <div id="app"></div>);
        const app = createApp(AppComp);
        const installer = makeInstaller([compA, compB]);
        // 这里假设 makeInstaller 返回一个函数，需要调用它
        app.use(installer); // 假设的用法，具体取决于 makeInstaller 的实现

        app.mount(wrapper.element);
        // 以下期望可能需要根据实际实现进行调整
        expect(installer).toBeDefined();
        // 如果 makeInstaller 正确注册了组件，以下断言也应该为真
        expect(app._context.components['CompA']).toBeTruthy();
        expect(app._context.components['CompB']).toBeTruthy();
    });
});