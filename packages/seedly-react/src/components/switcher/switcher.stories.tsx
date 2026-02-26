import { Switcher as SeedlySwitcher } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Switcher',
  component: SeedlySwitcher,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    threshold: '28rem',
    limit: 3,
    spacing: 4,
  },
  argTypes: {
    threshold: {
      control: {
        type: 'text',
      },
    },
    limit: {
      control: {
        type: 'select',
      },
      options: [2, 3, 4, 5, 6],
    },
    spacing: {
      control: {
        type: 'select',
      },
      options: [0, 2, 4, 6, 8, 10, 12],
    },
  },
} satisfies Meta<typeof SeedlySwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ threshold, limit, spacing }) => (
    <SeedlySwitcher threshold={threshold} limit={limit} spacing={spacing}>
      <Panel>Block 1</Panel>
      <Panel>Block 2</Panel>
      <Panel>Block 3</Panel>
      <Panel>Block 4</Panel>
      <Panel>Block 5</Panel>
    </SeedlySwitcher>
  ),
};

function Panel({ children }: { children: string }) {
  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
      }}
    >
      {children}
    </div>
  );
}
