import { Field } from '@base-ui/react/field';
import * as styles from '@kalink-ui/seedly/components/field';

import { Field as SeedlyField } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Field',
  component: SeedlyField.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyField.Root>;

export default meta;

type Story = StoryObj<typeof SeedlyField.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <Field.Root className={styles.field}>
      <Field.Label className={styles.label}>Name</Field.Label>
      <Field.Control required placeholder="Required" className={styles.input} />

      <Field.Error className={styles.error} match="valueMissing">
        Please enter your name
      </Field.Error>

      <Field.Description className={styles.description}>
        Visible on your profile
      </Field.Description>
    </Field.Root>
  );
}
