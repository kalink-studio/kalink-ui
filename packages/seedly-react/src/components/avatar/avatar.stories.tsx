import { Avatar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Avatar',
  component: Avatar.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar.Root>;

export default meta;

type Story = StoryObj<typeof Avatar.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <Avatar.Root>
        <Avatar.Image
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
          width="48"
          height="48"
        />
        <Avatar.Fallback>LT</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root>LT</Avatar.Root>
    </div>
  );
}
