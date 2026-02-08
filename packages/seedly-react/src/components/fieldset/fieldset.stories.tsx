import { Field } from '@base-ui/react/field';
import { Fieldset } from '@base-ui/react/fieldset';
import * as styles from '@kalink-ui/seedly/components/fieldset';

import { Fieldset as SeedlyFieldset } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Fieldset',
  component: SeedlyFieldset.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyFieldset.Root>;

export default meta;

type Story = StoryObj<typeof SeedlyFieldset.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <Fieldset.Root className={styles.fieldset}>
      <Fieldset.Legend className={styles.legend}>
        Billing details
      </Fieldset.Legend>

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
