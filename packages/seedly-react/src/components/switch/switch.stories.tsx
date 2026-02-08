import { Switch } from '@base-ui/react/switch';
import * as styles from '@kalink-ui/seedly/components/switch';

import { Switch as SeedlySwitch } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Switch',
  component: SeedlySwitch.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlySwitch.Root>;

export default meta;

type Story = StoryObj<typeof SeedlySwitch.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <label className={styles.label}>
      <Switch.Root defaultChecked className={styles.switchRoot}>
        <Switch.Thumb className={styles.thumb} />
      </Switch.Root>
      Notifications
    </label>
  );
}
