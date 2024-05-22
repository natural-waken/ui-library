import type { Meta, StoryObj, ArgTypes } from '@storybook/vue3';  // 用于定义 Storybook 的元数据和故事对象
import { fn, within, userEvent, expect, clearAllMocks } from '@storybook/test';  // 函数方法  用于编写交互测试
import { LiButton, LiButtonGroup } from 'ui-library';
import { set } from 'lodash-es';


// 定义类型别名  可能包含 argTypes 属性
type Story = StoryObj<typeof LiButton> & { argTypes?: ArgTypes };

// cpoy  比较复杂
const meta: Meta<typeof LiButton> = {
    title: 'Example/Button',
    component: LiButton,
    // subcomponents: { ButtonGroup: LiButtonGroup },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['primary', 'success', 'warning', 'danger', 'info', ''],
        },
        size: {
            control: { type: 'select' },
            options: ['large', 'default', 'small', ''],
        },
        disabled: {
            control: 'boolean',
        },
        loading: {
            control: 'boolean',
        },
        useThrottle: {
            control: 'boolean',
        },
        throttleDuration: {
            control: 'number',
        },
        autofocus: {
            control: 'boolean',
        },
        tag: {
            control: { type: 'select' },
            options: ['button', 'a', 'div'],
        },
        nativeType: {
            control: { type: 'select' },
            options: ['button', 'submit', 'reset', ''],
        },
        icon: {
            control: { type: 'text' },
        },
        loadingIcon: {
            control: { type: 'text' },
        },
    },
    args: { onClick: fn() },
};


// 包裹组件，使它在页面上有一些外边距
const container = (val: string) => `
    <div style="margin:5px">
        ${val}
    </div>
`;
// 然后定义个 default   类型是 story
// Default：这是个故事对象，表示默认状态下的按钮
export const Default: Story & { args: { content: string } } = {
    argTypes: {  // 为 content 属性定义一个文本控制
        content: {
            control: { type: 'text' },
        },
    },
    args: {  // 给个默认类型参数
        type: 'primary',
        content: 'Button',
    },
    render: (args) => ({  // 定义了如何渲染这个组件
        components: { LiButton },
        setup() {
            return { args };
        },
        template: container(
            `<li-button data-testid="story-test-btn" v-bind="args">{{args.content}}</li-button>`,
        ),
    }),

    // before
    // play: async ({ canvasElement, args, step }) => {  // 异步函数，用于编写交互测试
    //     const canvas = within(canvasElement);  // 传递给 within，用于在 canvas 内部查询 DOM 元素
    //     await step('click btn', async () => {  // 分步骤进行交互测试
    //         await userEvent.tripleClick(canvas.getByRole('button'));  // 模拟三次点击按钮
    //     });
    //     // 那里面找到 btn 点击次
    //     // 断言按钮的 onClick 事件被调用  用于验证在测试中某个函数是否被调用过
    //     expect(args.onClick).toHaveBeenCalled();
    // },

    // after  修改完整版
    play: async ({ canvasElement, args, step }) => {
        const canvas = within(canvasElement);
        const btn = canvas.getByTestId("story-test-btn");


        // 主要测试节流模式
        await step(
            "When useThrottle is set to true, the onclick should be called once",
            async () => {  // 为 true 时，点击事件只会被调用一次   节流（throttle）功能的预期行为
                set(args, "useThrottle", true);
                await userEvent.tripleClick(btn);

                expect(args.onClick).toHaveBeenCalledOnce();  // 使用了expect断言来验证onClick函数是否被调用了一次
                clearAllMocks();  // 清除所有的mock函数
            }
        );

        await step(
            "when useThrottle is set to false, the onclick should be called three times",
            async () => {
                set(args, "useThrottle", false);
                await userEvent.tripleClick(btn);

                expect(args.onClick).toHaveBeenCalledTimes(3);
                clearAllMocks();
            }
        );



        // disabled 对点击事件的屏蔽
        await step(
            "When disabled is set to true, the onclick should not be called",
            async () => {
                set(args, "disabled", true);
                await userEvent.click(btn);

                expect(args.onClick).toHaveBeenCalledTimes(0);
                set(args, "disabled", false);
                clearAllMocks();
            }
        );

        await step(
            "When loading is set to true, the onClick should not be called",
            async () => {
                set(args, "loading", true);
                await userEvent.click(btn);

                expect(args.onClick).toHaveBeenCalledTimes(0);
                set(args, "loading", false);
                clearAllMocks();
            }
        );

    }
};

// 展示按钮组件，并测试其自动聚焦行为
export const Autofocus: Story & { args: { content: string } } = {
    argTypes: {
        content: {
            control: { type: 'text' },
        },
    },
    args: {
        content: 'Button',
        autofocus: true,
    },
    render: (args) => ({  // 返回个 Vue 组件对象
        components: { LiButton },
        setup() {
            return { args };
        },
        template: container(
            `<p>请点击浏览器的刷新页面来获取按钮聚焦</p>
             <li-button data-testid="story-test-btn" v-bind="args">{{args.content}}</li-button>`
        ),
    }),
    play: async ({ args }) => {
        await userEvent.keyboard("{enter}");

        expect(args.onClick).toHaveBeenCalledOnce();
        clearAllMocks();  // 清除所有的模拟函数调用记录
    }
};


// 写个圆形图标按钮的 story
export const Circle: Story = {
    args: {
        icon: 'search',
    },
    render: (args) => ({
        components: { LiButton },
        setup() {
            return { args };
        },
        template: container(`
        <li-button circle v-bind="args"/>
        `),
    }),
    play: async ({ canvasElement, args, step }) => {
        const canvas = within(canvasElement);
        await step('click button', async () => {
            await userEvent.click(canvas.getByRole('button'));
        });

        expect(args.onClick).toHaveBeenCalled();
    },
};

Circle.parameters = {};

export const Group: Story & { args: { content1: string; content2: string } } = {
    argTypes: {
        groupType: {
            control: { type: 'select' },
            options: ['primary', 'success', 'warning', 'danger', 'info', ''],
        },
        groupSize: {
            control: { type: 'select' },
            options: ['large', 'default', 'small', ''],
        },
        groupDisabled: {
            control: 'boolean',
        },
        content1: {
            control: { type: 'text' },
            defaultValue: 'Button1',
        },
        content2: {
            control: { type: 'text' },
            defaultValue: 'Button2',
        },
    },
    args: {
        round: true,
        content1: 'Button1',
        content2: 'Button2',
    },
    render: (args) => ({
        components: { LiButton, LiButtonGroup },
        setup() {
            return { args };
        },
        template: container(`
        <li-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
            <li-button v-bind="args">{{args.content1}}</li-button>
            <li-button v-bind="args">{{args.content2}}</li-button>
        </li-button-group>
        `),
    }),
    play: async ({ canvasElement, args, step }) => {
        const canvas = within(canvasElement);
        await step('click btn1', async () => {
            await userEvent.click(canvas.getByText('Button1'));
        });
        await step('click btn2', async () => {
            await userEvent.click(canvas.getByText('Button2'));
        });
        expect(args.onClick).toHaveBeenCalled();
    },
};

export default meta;
