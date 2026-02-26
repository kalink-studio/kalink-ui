import { Stack as SeedlyStack } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Stack',
  component: SeedlyStack,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    spacing: 6,
    align: 'start',
  },
  argTypes: {
    spacing: {
      control: {
        type: 'select',
      },
      options: [0, 2, 4, 6, 8, 10, 12],
    },
    align: {
      control: {
        type: 'select',
      },
      options: ['start', 'center', 'end', 'stretch'],
    },
  },
} satisfies Meta<typeof SeedlyStack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ spacing, align }) => (
    <SeedlyStack spacing={spacing} align={align}>
      <div style={{ padding: '0.75rem 1rem', border: '1px solid #d1d5db' }}>
        First item
      </div>
      <div style={{ padding: '0.75rem 1rem', border: '1px solid #d1d5db' }}>
        Second item
      </div>
      <div style={{ padding: '0.75rem 1rem', border: '1px solid #d1d5db' }}>
        Third item
      </div>
    </SeedlyStack>
  ),
};
