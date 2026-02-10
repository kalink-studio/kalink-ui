import * as styles from '@kalink-ui/seedly/components/accordion';
import * as React from 'react';

import { Accordion } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Accordion',
  component: Accordion.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion.Root>;

export default meta;

type Story = StoryObj<typeof Accordion.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.Trigger>
            What is Base UI?
            <PlusIcon className={styles.triggerIcon} />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <div className={styles.content}>
            Base UI is a library of high-quality unstyled React components for
            design systems and web apps.
          </div>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.Header>
          <Accordion.Trigger>
            How do I get started?
            <PlusIcon className={styles.triggerIcon} />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <div className={styles.content}>
            Head to the “Quick start” guide in the docs. If you’ve used unstyled
            libraries before, you’ll feel at home.
          </div>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.Header>
          <Accordion.Trigger>
            Can I use it for my project?
            <PlusIcon className={styles.triggerIcon} />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <div className={styles.content}>
            Of course! Base UI is free and open source.
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
}

function PlusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 12 12" fill="currentcolor" {...props}>
      <path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" />
    </svg>
  );
}
