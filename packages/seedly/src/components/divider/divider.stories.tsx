import { responsiveSelectArg } from '../../utils';

import { Divider } from './divider';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Component/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    tone: responsiveSelectArg({
      options: ['neutral', 'primary', 'destructive', 'success'],
      summary: 'Responsive<Tone>',
    }),
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {};
