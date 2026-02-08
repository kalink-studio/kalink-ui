import { Button } from '@base-ui/react/button';
import * as styles from '@kalink-ui/seedly/components/button';

import { Button as SeedlyButton } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Button',
  component: SeedlyButton,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyButton>;

export default meta;

type Story = StoryObj<typeof SeedlyButton>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return <Button className={styles.button}>Submit</Button>;
}
