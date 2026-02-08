import { NumberField } from '@base-ui/react/number-field';
import * as styles from '@kalink-ui/seedly/components/number-field';
import * as React from 'react';

import { NumberField as SeedlyNumberField } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Number Field',
  component: SeedlyNumberField.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyNumberField.Root>;

export default meta;

type Story = StoryObj<typeof SeedlyNumberField.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  const id = React.useId();
  return (
    <NumberField.Root id={id} defaultValue={100} className={styles.field}>
      <NumberField.ScrubArea className={styles.scrubArea}>
        <label htmlFor={id} className={styles.label}>
          Amount
        </label>
        <NumberField.ScrubAreaCursor className={styles.scrubAreaCursor}>
          <CursorGrowIcon />
        </NumberField.ScrubAreaCursor>
      </NumberField.ScrubArea>

      <NumberField.Group className={styles.group}>
        <NumberField.Decrement className={styles.decrement}>
          <MinusIcon />
        </NumberField.Decrement>
        <NumberField.Input className={styles.input} />
        <NumberField.Increment className={styles.increment}>
          <PlusIcon />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

function CursorGrowIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="black"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

function PlusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
    </svg>
  );
}

function MinusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H10" />
    </svg>
  );
}
