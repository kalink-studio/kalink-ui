import { Fieldset } from '../fieldset';

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
    <Fieldset.Root>
      <Fieldset.Legend>Best apple</Fieldset.Legend>

      <Radio.Group defaultValue="fuji-apple">
        <Radio.Item>
          <Radio.Root value="fuji-apple">
            <Radio.Indicator />
          </Radio.Root>
          Fuji
        </Radio.Item>

        <Radio.Item>
          <Radio.Root value="gala-apple">
            <Radio.Indicator />
          </Radio.Root>
          Gala
        </Radio.Item>

        <Radio.Item>
          <Radio.Root value="granny-smith-apple">
            <Radio.Indicator />
          </Radio.Root>
          Granny Smith
        </Radio.Item>
      </Radio.Group>
    </Fieldset.Root>
  );
}
