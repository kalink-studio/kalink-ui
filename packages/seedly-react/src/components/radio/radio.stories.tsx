import * as styles from '@kalink-ui/seedly/components/radio';
import * as React from 'react';

import { Radio } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Radio',
  component: Radio.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Radio.Root>;

export default meta;

type Story = StoryObj<typeof Radio.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  const id = React.useId();
  return (
    <Radio.Group aria-labelledby={id} defaultValue="fuji-apple">
      <div className={styles.caption} id={id}>
        Best apple
      </div>

      <label className={styles.item}>
        <Radio.Root value="fuji-apple">
          <Radio.Indicator />
        </Radio.Root>
        Fuji
      </label>

      <label className={styles.item}>
        <Radio.Root value="gala-apple">
          <Radio.Indicator />
        </Radio.Root>
        Gala
      </label>

      <label className={styles.item}>
        <Radio.Root value="granny-smith-apple">
          <Radio.Indicator />
        </Radio.Root>
        Granny Smith
      </label>
    </Radio.Group>
  );
}
