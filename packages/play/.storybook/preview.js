
import "ui-library/dist/index.css"  // 必须要引入这个  不然 storybook 样式展示有问题

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
