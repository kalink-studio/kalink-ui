import { expect, userEvent, within } from 'storybook/test';

import { Input, InputLabel } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => <Example />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: /name/i });
    await userEvent.type(input, 'Ada Lovelace');
    await expect(input).toHaveValue('Ada Lovelace');
  },
};

function Example() {
  return (
    <InputLabel>
      Name
      <Input placeholder="Enter your name" />
    </InputLabel>
  );
}
