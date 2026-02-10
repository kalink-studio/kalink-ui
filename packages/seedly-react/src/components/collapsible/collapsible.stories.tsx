import * as styles from '@kalink-ui/seedly/components/collapsible';
import * as React from 'react';

import { Collapsible } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Collapsible.Root>;

export default meta;

type Story = StoryObj<typeof Collapsible.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger>
        <ChevronIcon className={styles.icon} />
        Recovery keys
      </Collapsible.Trigger>
      <Collapsible.Panel>
        <div className={styles.content}>
          <div>alien-bean-pasta</div>
          <div>wild-irish-burrito</div>
          <div>horse-battery-staple</div>
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

export function ChevronIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
      <path d="M3.5 9L7.5 5L3.5 1" stroke="currentcolor" />
    </svg>
  );
}
