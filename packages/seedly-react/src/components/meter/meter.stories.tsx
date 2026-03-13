import { Meter } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Meter',
  component: Meter.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Meter.Root>;

export default meta;

type Story = StoryObj<typeof Meter.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <Meter.Root value={24}>
      <Meter.Label>Storage Used</Meter.Label>
      <Meter.Value />
      <Meter.Track>
        <Meter.Indicator />
      </Meter.Track>
    </Meter.Root>
  );
}
