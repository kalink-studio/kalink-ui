import * as React from 'react';

import { Progress } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Progress',
  component: Progress.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Progress.Root>;

export default meta;

type Story = StoryObj<typeof Progress.Root>;

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
    <Progress.Root value={value}>
      <Progress.Label>Export data</Progress.Label>
      <Progress.Value />
      <Progress.Track>
        <Progress.Indicator />
      </Progress.Track>
    </Progress.Root>
  );
}
