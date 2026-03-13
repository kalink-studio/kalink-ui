import { Input } from '../input';

import { Label } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => (
    <Label htmlFor="email">
      Email
      <Input id="email" placeholder="you@example.com" />
    </Label>
  ),
};

export const Choice: Story = {
  render: () => <Label variant="choice">Enable notifications</Label>,
};
