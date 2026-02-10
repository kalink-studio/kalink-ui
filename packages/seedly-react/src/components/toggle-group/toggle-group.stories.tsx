import * as styles from '@kalink-ui/seedly/components/toggle-group';
import * as React from 'react';

import { Toggle } from '../toggle';

import { ToggleGroup } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Toggle Group',
  component: ToggleGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <ToggleGroup defaultValue={['left']}>
      <Toggle aria-label="Align left" value="left" className={styles.button}>
        <AlignLeftIcon className={styles.icon} />
      </Toggle>
      <Toggle
        aria-label="Align center"
        value="center"
        className={styles.button}
      >
        <AlignCenterIcon className={styles.icon} />
      </Toggle>
      <Toggle aria-label="Align right" value="right" className={styles.button}>
        <AlignRightIcon className={styles.icon} />
      </Toggle>
    </ToggleGroup>
  );
}

function AlignLeftIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      stroke="currentcolor"
      strokeLinecap="round"
      {...props}
    >
      <path d="M2.5 3.5H13.5" />
      <path d="M2.5 9.5H13.5" />
      <path d="M2.5 6.5H10.5" />
      <path d="M2.5 12.5H10.5" />
    </svg>
  );
}

function AlignCenterIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      stroke="currentcolor"
      strokeLinecap="round"
      {...props}
    >
      <path d="M3 3.5H14" />
      <path d="M3 9.5H14" />
      <path d="M4.5 6.5H12.5" />
      <path d="M4.5 12.5H12.5" />
    </svg>
  );
}

function AlignRightIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      stroke="currentcolor"
      strokeLinecap="round"
      {...props}
    >
      <path d="M2.5 3.5H13.5" />
      <path d="M2.5 9.5H13.5" />
      <path d="M5.5 6.5H13.5" />
      <path d="M5.5 12.5H13.5" />
    </svg>
  );
}
