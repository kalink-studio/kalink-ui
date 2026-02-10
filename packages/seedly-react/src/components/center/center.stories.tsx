import { Center as SeedlyCenter } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Center',
  component: SeedlyCenter,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyCenter>;

export default meta;

type Story = StoryObj<typeof SeedlyCenter>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <SeedlyCenter andText gutters={{ xs: 4, md: 8 }}>
      <h3 style={{ marginBlockStart: 0 }}>Centered copy block</h3>
      <p style={{ marginBlock: 0 }}>
        Center constrains line length while keeping content centered in the
        viewport.
      </p>
    </SeedlyCenter>
  );
}
