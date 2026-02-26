import { Field } from '../field';

import { Fieldset } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Fieldset',
  component: Fieldset.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Fieldset.Root>;

export default meta;

type Story = StoryObj<typeof Fieldset.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <Fieldset.Root>
      <Fieldset.Legend>Billing details</Fieldset.Legend>

      <Field.Root>
        <Field.Label>Company</Field.Label>
        <Field.Control placeholder="Enter company name" />
      </Field.Root>

      <Field.Root>
        <Field.Label>Tax ID</Field.Label>
        <Field.Control placeholder="Enter fiscal number" />
      </Field.Root>
    </Fieldset.Root>
  );
}
