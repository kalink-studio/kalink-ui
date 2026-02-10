import { Container as SeedlyContainer } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Container',
  component: SeedlyContainer,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyContainer>;

export default meta;

type Story = StoryObj<typeof SeedlyContainer>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <SeedlyContainer variant="solid" level="high" spacing={6}>
      <h3 style={{ margin: 0 }}>Performance report</h3>
      <p style={{ margin: '0.75rem 0 0' }}>
        Container is useful for section shells with configurable level and
        visual treatment.
      </p>
    </SeedlyContainer>
  );
}
