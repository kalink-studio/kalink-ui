import { Cover as SeedlyCover } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Cover',
  component: SeedlyCover,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyCover>;

export default meta;

type Story = StoryObj<typeof SeedlyCover>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <SeedlyCover minSize="24rem" spacing={6}>
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
  );
}
