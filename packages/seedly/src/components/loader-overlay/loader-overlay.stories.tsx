import { responsiveSelectArg } from '../../utils';

import { LoaderOverlay } from './loader-overlay';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Component/LoaderOverlay',
  component: LoaderOverlay,
  tags: ['autodocs'],
  argTypes: {
    tone: responsiveSelectArg({
      options: ['neutral', 'primary', 'destructive', 'success'],
      summary: 'Responsive<Tone>',
    }),
  },
} satisfies Meta<typeof LoaderOverlay>;

export default meta;

type Story = StoryObj<typeof LoaderOverlay>;

export const Default: Story = {};

export const WithText: Story = {
  args: {
    text: 'Loading, please wait...',
  },
};
