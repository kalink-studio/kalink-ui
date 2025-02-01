import '../theme/ref.css';
import '../theme/theme.css';

import { type Preview } from '@storybook/react';
import React from 'react';

const preview: Preview = {
  parameters: {
    docs: { controls: { sort: 'requiredFirst' } },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    options: {
      storySort: {
        order: ['Styles', 'Layout', 'Components'],
      },
    },
  },
  decorators: [(Story) => <Story />],
};

export default preview;
