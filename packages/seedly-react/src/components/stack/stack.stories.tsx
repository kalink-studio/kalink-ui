import { Stack as SeedlyStack } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Stack',
  component: SeedlyStack,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyStack>;

export default meta;

type Story = StoryObj<typeof SeedlyStack>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <SeedlyStack
      spacing={{ xs: 3, md: 6 }}
      align={{ xs: 'start', md: 'center' }}
    >
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
  );
}
