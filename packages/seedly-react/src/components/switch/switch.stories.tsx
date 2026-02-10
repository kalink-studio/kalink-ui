import * as styles from '@kalink-ui/seedly/components/switch';

import { Switch } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Switch',
  component: Switch.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Switch.Root>;

export default meta;

type Story = StoryObj<typeof Switch.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <label className={styles.label}>
      <Switch.Root defaultChecked>
        <Switch.Thumb />
      </Switch.Root>
      Notifications
    </label>
  );
}
