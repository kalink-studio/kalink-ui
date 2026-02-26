import { Collapsible } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';

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
        <Collapsible.Icon render={<ChevronIcon />} />
        Recovery keys
      </Collapsible.Trigger>
      <Collapsible.Panel>
        <Collapsible.Content>
          <div>alien-bean-pasta</div>
          <div>wild-irish-burrito</div>
          <div>horse-battery-staple</div>
        </Collapsible.Content>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

function ChevronIcon(props: ComponentProps<'svg'>) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
      <path d="M3.5 9L7.5 5L3.5 1" stroke="currentcolor" />
    </svg>
  );
}
