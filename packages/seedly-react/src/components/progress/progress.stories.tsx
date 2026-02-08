import { Progress } from '@base-ui/react/progress';
import * as styles from '@kalink-ui/seedly/components/progress';
import * as React from 'react';

import { Progress as SeedlyProgress } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Progress',
  component: SeedlyProgress.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyProgress.Root>;

export default meta;

type Story = StoryObj<typeof SeedlyProgress.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  const [value, setValue] = React.useState(20);

  // Simulate changes
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((current) =>
        Math.min(100, Math.round(current + Math.random() * 25)),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Progress.Root className={styles.progress} value={value}>
      <Progress.Label className={styles.label}>Export data</Progress.Label>
      <Progress.Value className={styles.value} />
      <Progress.Track className={styles.track}>
        <Progress.Indicator className={styles.indicator} />
      </Progress.Track>
    </Progress.Root>
  );
}
