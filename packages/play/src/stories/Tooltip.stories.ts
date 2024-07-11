import type { StoryObj, Meta } from "@storybook/vue3";
import { fn } from "@storybook/test";
import 'ui-library/dist/theme/Tooltip.css'  // 样式引进来
import { LiTooltip } from "ui-library";

type Story = StoryObj<typeof LiTooltip>;

const meta: Meta<typeof LiTooltip> = {
    title: "Example/Tooltip",
    component: LiTooltip,
    tags: ["autodocs"],
    argTypes: {
        trigger: {
            options: ["hover", "click", "contextmenu"],
            control: {
                type: "select",
            },
        },
        placement: {
            options: ["top", "bottom", "left", "right"],
            control: {
                type: "select",
            },
        }
    },
    args: {
        "onVisible-change": fn(),
    }
};

export const Default: Story = {
    args: {
        content: "This is a tooltip",
        placement: "top",
        trigger: "hover",
    },
    render: (args) => ({
        components: { LiTooltip },

        setup() {
            return {
                args,
            };
        },
        template: `
          <LiTooltip v-bind="args">
            <div style="height:30px; width:200px; background:red; padding:auto">trigger</div>
          </LiTooltip>
        `,

    }),
};

export default meta;

