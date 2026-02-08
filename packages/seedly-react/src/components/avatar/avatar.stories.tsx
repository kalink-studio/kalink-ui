import { Avatar } from '@base-ui/react/avatar';
import * as styles from '@kalink-ui/seedly/components/avatar';

import { Avatar as SeedlyAvatar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Avatar',
  component: SeedlyAvatar.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyAvatar.Root>;

export default meta;

type Story = StoryObj<typeof SeedlyAvatar.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <Avatar.Root className={styles.root}>
        <Avatar.Image
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
          width="48"
          height="48"
          className={styles.image}
        />
        <Avatar.Fallback className={styles.fallback}>LT</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root className={styles.root}>LT</Avatar.Root>
    </div>
  );
}
