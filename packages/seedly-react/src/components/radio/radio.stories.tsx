import { expect, within } from 'storybook/test';

import { RadioGroup } from '../radio-group';

import { Radio } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Radio',
  component: Radio.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Radio.Root>;

export default meta;

type Story = StoryObj<typeof Radio.Root>;

export const Default: Story = {
  render: () => <Example />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole('radio');
    await expect(radio).toBeChecked();
  },
};

function Example() {
  return (
    <RadioGroup.Root defaultValue="fuji-apple">
      <Radio.Label>
        <Radio.Root value="fuji-apple">
          <Radio.Indicator />
        </Radio.Root>
        Fuji
      </Radio.Label>
    </RadioGroup.Root>
  );
}
