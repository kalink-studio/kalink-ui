import '../src/styles/reset.css';
import '../src/styles/layers.css';
import './theme/ref.css';
import './theme/theme.css';

import { type Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
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
        order: ['Styles', 'Layout', 'Typography', 'Components'],
      },
    },
  },
};

export default preview;
