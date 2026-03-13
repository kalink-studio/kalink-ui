import { Button } from '../button';
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
      <Button variant="bare" nativeButton={false} render={<a href="#" />}>
        Home
      </Button>
      <Button variant="bare" nativeButton={false} render={<a href="#" />}>
        Pricing
      </Button>
      <Button variant="bare" nativeButton={false} render={<a href="#" />}>
        Docs
      </Button>
      <Button variant="bare" nativeButton={false} render={<a href="#" />}>
        Blog
      </Button>
      <Button variant="bare" nativeButton={false} render={<a href="#" />}>
        Support
      </Button>

      <Separator orientation="vertical" />

      <Button variant="bare" nativeButton={false} render={<a href="#" />}>
        Log in
      </Button>
      <Button variant="bare" nativeButton={false} render={<a href="#" />}>
        Sign up
      </Button>
    </Cluster>
  );
}
