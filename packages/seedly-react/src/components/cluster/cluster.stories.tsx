import { Cluster as SeedlyCluster } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Cluster',
  component: SeedlyCluster,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyCluster>;

export default meta;

type Story = StoryObj<typeof SeedlyCluster>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <SeedlyCluster spacing={4} justify="spaceBetween" align="center">
      <button type="button">Back</button>
      <button type="button">Save draft</button>
      <button type="button">Publish</button>
    </SeedlyCluster>
  );
}
