import { expect, userEvent, within } from 'storybook/test';

import { Slider } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Slider',
  component: Slider.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider.Root>;

export default meta;

type Story = StoryObj<typeof Slider.Root>;

export const Default: Story = {
  render: () => <Example />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const thumb = canvas.getByRole('slider', { name: /volume/i });

    thumb.focus();

    await userEvent.keyboard('{ArrowRight}');
    await expect(thumb).toHaveAttribute('aria-valuenow', '26');
  },
};

function Example() {
  return (
    <Slider.Root defaultValue={25}>
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
        </Slider.Track>
        <Slider.Thumb aria-label="Volume" />
      </Slider.Control>
    </Slider.Root>
  );
}
