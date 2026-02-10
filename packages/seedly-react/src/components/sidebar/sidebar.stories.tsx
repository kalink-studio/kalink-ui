import { Sidebar as SeedlySidebar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Sidebar',
  component: SeedlySidebar,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlySidebar>;

export default meta;

type Story = StoryObj<typeof SeedlySidebar>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <SeedlySidebar sideWidth="14rem" contentMinWidth="60%" spacing={6}>
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
  );
}
