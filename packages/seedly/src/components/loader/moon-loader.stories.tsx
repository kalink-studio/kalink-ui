import { MoonLoader } from './moon-loader';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Component/MoonLoader',
  component: MoonLoader,
  args: {
    active: true,
  },
} satisfies Meta<typeof MoonLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
