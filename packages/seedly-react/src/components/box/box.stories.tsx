import { Box as SeedlyBox } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Box',
  component: SeedlyBox,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyBox>;

export default meta;

type Story = StoryObj<typeof SeedlyBox>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <SeedlyBox tone="primary" variant="outline" spacing={6}>
      <h3 style={{ margin: 0 }}>Team updates</h3>
      <p style={{ margin: '0.75rem 0 0' }}>
        Box provides spacing, radius, elevation, and tone-aware container
        styles.
      </p>
    </SeedlyBox>
  );
}
