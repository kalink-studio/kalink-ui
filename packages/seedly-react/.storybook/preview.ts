import '@kalink-ui/seedly/styles/reset';
import '@kalink-ui/seedly/styles/layers';
import '@kalink-ui/seedly/styles/theme/base-ui';

import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  initialGlobals: {
    backgrounds: { value: 'light' },
  },
  parameters: {
    a11y: {
      test: 'error',
    },
    docs: { controls: { sort: 'requiredFirst' } },
    tags: ['autodocs'],
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Components'],
      },
    },
    backgrounds: {
      options: {
        light: { name: 'Light', value: 'oklch(98.4% 0.003 247.858)' },
        dark: { name: 'Dark', value: 'oklch(20% 0.0166 257.417)' },
      },
    },
  },
};

export default preview;
