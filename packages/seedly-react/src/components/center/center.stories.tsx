import { Center as SeedlyCenter } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Center',
  component: SeedlyCenter,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    andText: true,
    gutters: 8,
    intrinsic: false,
  },
  argTypes: {
    andText: {
      control: {
        type: 'boolean',
      },
    },
    gutters: {
      control: {
        type: 'select',
      },
      options: [0, 2, 4, 6, 8, 10, 12],
    },
    intrinsic: {
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies Meta<typeof SeedlyCenter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ andText, gutters, intrinsic }) => (
    <SeedlyCenter andText={andText} gutters={gutters} intrinsic={intrinsic}>
      <h3 style={{ marginBlockStart: 0 }}>Centered copy block</h3>
      <p style={{ marginBlock: 0 }}>
        Center constrains line length while keeping content centered in the
        viewport.
      </p>
    </SeedlyCenter>
  ),
};
