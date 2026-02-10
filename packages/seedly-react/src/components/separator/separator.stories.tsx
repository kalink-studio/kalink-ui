import * as styles from '@kalink-ui/seedly/components/separator';

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
    <div className={styles.container}>
      <a href="#" className={styles.link}>
        Home
      </a>
      <a href="#" className={styles.link}>
        Pricing
      </a>
      <a href="#" className={styles.link}>
        Blog
      </a>
      <a href="#" className={styles.link}>
        Support
      </a>

      <Separator orientation="vertical" />

      <a href="#" className={styles.link}>
        Log in
      </a>
      <a href="#" className={styles.link}>
        Sign up
      </a>
    </div>
  );
}
