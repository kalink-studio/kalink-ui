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
      values: [
        { name: 'light', value: '#f7f8fa' },
        { name: 'dark', value: '#0d1017' },
      ],
    },
  },
};

export default preview;
