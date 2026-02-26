import { Cover as SeedlyCover } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Cover',
  component: SeedlyCover,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    minSize: '24rem',
    spacing: 6,
  },
  argTypes: {
    minSize: {
      control: {
        type: 'text',
      },
    },
    spacing: {
      control: {
        type: 'select',
      },
      options: [0, 2, 4, 6, 8, 10, 12],
    },
  },
} satisfies Meta<typeof SeedlyCover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ minSize, spacing }) => (
    <SeedlyCover minSize={minSize} spacing={spacing}>
      <header style={{ padding: '0.75rem 1rem', border: '1px solid #d1d5db' }}>
        Header
      </header>
      <main
        data-cover-center
        style={{
          padding: '1rem',
          border: '1px solid #9ca3af',
          textAlign: 'center',
        }}
      >
        Centered content
      </main>
      <footer style={{ padding: '0.75rem 1rem', border: '1px solid #d1d5db' }}>
        Footer
      </footer>
    </SeedlyCover>
  ),
};
