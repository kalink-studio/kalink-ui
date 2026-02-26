import { Sidebar as SeedlySidebar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Sidebar',
  component: SeedlySidebar,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    side: 'left',
    sideWidth: '14rem',
    contentMinWidth: '60%',
    spacing: 6,
    noStretch: false,
  },
  argTypes: {
    side: {
      control: {
        type: 'inline-radio',
      },
      options: ['left', 'right'],
    },
    sideWidth: {
      control: {
        type: 'text',
      },
    },
    contentMinWidth: {
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
    noStretch: {
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies Meta<typeof SeedlySidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ side, sideWidth, contentMinWidth, spacing, noStretch }) => (
    <SeedlySidebar
      side={side}
      sideWidth={sideWidth}
      contentMinWidth={contentMinWidth}
      spacing={spacing}
      noStretch={noStretch}
    >
      <aside
        style={{
          padding: '1rem',
          border: '1px solid #d1d5db',
          borderRadius: '0.5rem',
        }}
      >
        Sidebar
      </aside>
      <main
        style={{
          padding: '1rem',
          border: '1px solid #9ca3af',
          borderRadius: '0.5rem',
        }}
      >
        Main content area
      </main>
    </SeedlySidebar>
  ),
};
