import { NumberField } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Number Field',
  component: NumberField,
  tags: ['autodocs'],
} satisfies Meta<typeof NumberField>;

export default meta;

type Story = StoryObj<typeof NumberField>;

export const Default: Story = {};
