import '../src/styles/reset.css';
import '../src/styles/layers.css';
import '../src/styles/theme/sprout-ref.css';

import { type Decorator, type Preview } from '@storybook/react-vite';

import { sprout } from '../src/styles/theme/sprout.css';

const withSproutTheme: Decorator = (Story) => {
  if (typeof document !== 'undefined') {
    document.body.classList.add(sprout);
  }

  return Story();
};

const preview: Preview = {
  decorators: [withSproutTheme],
  parameters: {
    a11y: {
      // Fail tests on a11y violations
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
        order: ['Styles', 'Layout', 'Typography', 'Components'],
      },
    },
  },
};

export default preview;
