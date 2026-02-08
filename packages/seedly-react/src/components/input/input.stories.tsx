import { Input } from '@base-ui/react/input';
import * as styles from '@kalink-ui/seedly/components/input';

import { Input as SeedlyInput } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Input',
  component: SeedlyInput,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyInput>;

export default meta;

type Story = StoryObj<typeof SeedlyInput>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <label className={styles.label}>
      Name
      <Input placeholder="Enter your name" className={styles.input} />
    </label>
  );
}
