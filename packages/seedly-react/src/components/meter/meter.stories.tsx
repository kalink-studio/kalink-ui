import { Meter } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Meter',
  component: Meter,
  tags: ['autodocs'],
} satisfies Meta<typeof Meter>;

export default meta;

type Story = StoryObj<typeof Meter>;

export const Default: Story = {};
