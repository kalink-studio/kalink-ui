import { Combobox } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof Combobox>;

export const Default: Story = {};
