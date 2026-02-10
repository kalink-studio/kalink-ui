import * as styles from '@kalink-ui/seedly/components/form';
import * as React from 'react';

import { Button } from '../button';
import { Field } from '../field';

import { Form } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  return (
    <Form
      errors={errors}
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const value = formData.get('url') as string;

        setLoading(true);
        const response = await submitForm(value);
        const serverErrors = {
          url: response.error,
        };

        setErrors(serverErrors);
        setLoading(false);
      }}
    >
      <Field.Root name="url" className={styles.field}>
        <Field.Label className={styles.label}>Homepage</Field.Label>
        <Field.Control
          type="url"
          required
          defaultValue="https://example.com"
          placeholder="https://example.com"
          pattern="https?://.*"
          className={styles.input}
        />
        <Field.Error className={styles.error} />
      </Field.Root>
      <Button
        type="submit"
        disabled={loading}
        focusableWhenDisabled
        className={styles.button}
      >
        Submit
      </Button>
    </Form>
  );
}

async function submitForm(value: string) {
  // Mimic a server response
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  try {
    const url = new URL(value);

    if (url.hostname.endsWith('example.com')) {
      return { error: 'The example domain is not allowed' };
    }
  } catch {
    return { error: 'This is not a valid URL' };
  }

  return { success: true };
}
