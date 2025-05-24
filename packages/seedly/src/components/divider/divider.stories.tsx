import { Divider } from './divider';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/Divider',
  component: Divider,
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {};
