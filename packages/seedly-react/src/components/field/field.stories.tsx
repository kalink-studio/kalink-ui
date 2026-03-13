import { Field } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Field',
  component: Field.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Field.Root>;

export default meta;

type Story = StoryObj<typeof Field.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <Field.Root>
      <Field.Label>Name</Field.Label>
      <Field.Control required placeholder="Required" />

      <Field.Error match="valueMissing">Please enter your name</Field.Error>

      <Field.Description>Visible on your profile</Field.Description>
    </Field.Root>
  );
}
