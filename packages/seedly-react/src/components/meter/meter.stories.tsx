import { Meter } from '@base-ui/react/meter';
import * as styles from '@kalink-ui/seedly/components/meter';

import { Meter as SeedlyMeter } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Meter',
  component: SeedlyMeter.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyMeter.Root>;

export default meta;

type Story = StoryObj<typeof SeedlyMeter.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <Meter.Root className={styles.meter} value={24}>
      <Meter.Label className={styles.label}>Storage Used</Meter.Label>
      <Meter.Value className={styles.value} />
      <Meter.Track className={styles.track}>
        <Meter.Indicator className={styles.indicator} />
      </Meter.Track>
    </Meter.Root>
  );
}
