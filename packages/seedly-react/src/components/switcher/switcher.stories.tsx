import { Switcher as SeedlySwitcher } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Switcher',
  component: SeedlySwitcher,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlySwitcher>;

export default meta;

type Story = StoryObj<typeof SeedlySwitcher>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <SeedlySwitcher threshold="28rem" limit={{ xs: 2, lg: 4 }} spacing={4}>
      <Panel>Block 1</Panel>
      <Panel>Block 2</Panel>
      <Panel>Block 3</Panel>
      <Panel>Block 4</Panel>
      <Panel>Block 5</Panel>
    </SeedlySwitcher>
  );
}

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
