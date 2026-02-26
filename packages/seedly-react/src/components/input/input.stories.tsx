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
};

function Example() {
  return (
    <InputLabel>
      Name
      <Input placeholder="Enter your name" />
    </InputLabel>
  );
}
