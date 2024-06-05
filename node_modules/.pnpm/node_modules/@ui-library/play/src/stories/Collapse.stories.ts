import type { Meta, StoryObj } from "@storybook/vue3";
import { LiCollapse, LiCollapseItem } from 'ui-library';
import 'ui-library/dist/theme/Collapse.css';


type Story = StoryObj<typeof LiCollapse>;

const meta: Meta<typeof LiCollapse> = {
    title: "Components/Collapse",
    component: LiCollapse,
    subcomponents: { LiCollapseItem },
    tags: ["autodocs"],
};

export const Default: Story = {
    render: (args) => ({
        components: {
            LiCollapse,
            LiCollapseItem,
        },
        setup() {
            return {
                args,
            };
        },
        template: `
            <li-collapse v-bind="args">
                <li-collapse-item name="a" title="Title a">
                    <div>this is content a</div>
                </li-collapse-item>
                <li-collapse-item name="b" title="title b">
                    <div>this is content b</div>
                </li-collapse-item>
                <li-collapse-item name="c" title="title c  disable" disabled>
                    <div>this is content c</div>
                </li-collapse-item>
            </li-collapse>
        `,
    }),
    args: {
        accordion: true,
        modelValue: ["a"],
    },
};

export default meta;