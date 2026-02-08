import { Radio } from '@base-ui/react/radio';
import { RadioGroup } from '@base-ui/react/radio-group';
import * as styles from '@kalink-ui/seedly/components/radio';
import * as React from 'react';

import { Radio as SeedlyRadio } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Radio',
  component: SeedlyRadio.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyRadio.Root>;

export default meta;

type Story = StoryObj<typeof SeedlyRadio.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  const id = React.useId();
  return (
    <RadioGroup
      aria-labelledby={id}
      defaultValue="fuji-apple"
      className={styles.radioGroup}
    >
      <div className={styles.caption} id={id}>
        Best apple
      </div>

      <label className={styles.item}>
        <Radio.Root value="fuji-apple" className={styles.radio}>
          <Radio.Indicator className={styles.indicator} />
        </Radio.Root>
        Fuji
      </label>

      <label className={styles.item}>
        <Radio.Root value="gala-apple" className={styles.radio}>
          <Radio.Indicator className={styles.indicator} />
        </Radio.Root>
        Gala
      </label>

      <label className={styles.item}>
        <Radio.Root value="granny-smith-apple" className={styles.radio}>
          <Radio.Indicator className={styles.indicator} />
        </Radio.Root>
        Granny Smith
      </label>
    </RadioGroup>
  );
}
