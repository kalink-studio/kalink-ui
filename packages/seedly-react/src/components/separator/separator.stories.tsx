import { Cluster } from '../cluster';

import { Separator } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <Cluster spacing={4} align="center" render={<nav />}>
      <a href="#">Home</a>
      <a href="#">Pricing</a>
      <a href="#">Blog</a>
      <a href="#">Support</a>

      <Separator orientation="vertical" />

      <a href="#">Log in</a>
      <a href="#">Sign up</a>
    </Cluster>
  );
}
