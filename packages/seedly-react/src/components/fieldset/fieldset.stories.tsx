import * as styles from '@kalink-ui/seedly/components/fieldset';

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

      <Field.Root className={styles.field}>
        <Field.Label className={styles.label}>Company</Field.Label>
        <Field.Control
          placeholder="Enter company name"
          className={styles.input}
        />
      </Field.Root>

      <Field.Root className={styles.field}>
        <Field.Label className={styles.label}>Tax ID</Field.Label>
        <Field.Control
          placeholder="Enter fiscal number"
          className={styles.input}
        />
      </Field.Root>
    </Fieldset.Root>
  );
}
