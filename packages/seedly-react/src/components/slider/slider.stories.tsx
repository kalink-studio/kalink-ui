import { Slider } from '@base-ui/react/slider';
import * as styles from '@kalink-ui/seedly/components/slider';

import { Slider as SeedlySlider } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Slider',
  component: SeedlySlider.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlySlider.Root>;

export default meta;

type Story = StoryObj<typeof SeedlySlider.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <Slider.Root defaultValue={25}>
      <Slider.Control className={styles.control}>
        <Slider.Track className={styles.track}>
          <Slider.Indicator className={styles.indicator} />
          <Slider.Thumb aria-label="Volume" className={styles.thumb} />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}
