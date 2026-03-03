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
