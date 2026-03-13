import { expect, userEvent, within } from 'storybook/test';

import { Fieldset } from '../fieldset';
import { Radio } from '../radio';

import { RadioGroup } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Radio Group',
  component: RadioGroup.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup.Root>;

export default meta;

type Story = StoryObj<typeof RadioGroup.Root>;

export const Default: Story = {
  render: () => <Example />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const gala = canvas.getAllByRole('radio')[1];
    await expect(gala).toBeDefined();
    if (!gala) {
      return;
    }

    await userEvent.click(gala);
    await expect(gala).toBeChecked();
  },
};

function Example() {
  return (
    <Fieldset.Root>
      <Fieldset.Legend>Best apple</Fieldset.Legend>

      <RadioGroup.Root defaultValue="fuji-apple">
        <Radio.Label>
          <Radio.Root value="fuji-apple">
            <Radio.Indicator />
          </Radio.Root>
          Fuji
        </Radio.Label>

        <Radio.Label>
          <Radio.Root value="gala-apple">
            <Radio.Indicator />
          </Radio.Root>
          Gala
        </Radio.Label>

        <Radio.Label>
          <Radio.Root value="granny-smith-apple">
            <Radio.Indicator />
          </Radio.Root>
          Granny Smith
        </Radio.Label>
      </RadioGroup.Root>
    </Fieldset.Root>
  );
}
