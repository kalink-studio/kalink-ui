import * as React from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { NumberField } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Number Field',
  component: NumberField.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof NumberField.Root>;

export default meta;

type Story = StoryObj<typeof NumberField.Root>;

export const Default: Story = {
  render: () => <Example />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const increment = canvas.getByRole('button', { name: /increase/i });
    const input = canvas.getByRole('textbox', { name: /amount/i });

    await userEvent.click(increment);

    await expect(input).toHaveValue('101');
  },
};

function Example() {
  const id = React.useId();
  return (
    <NumberField.Root id={id} defaultValue={100}>
      <NumberField.ScrubArea>
        <NumberField.Label htmlFor={id}>Amount</NumberField.Label>
        <NumberField.ScrubAreaCursor>
          <CursorGrowIcon />
        </NumberField.ScrubAreaCursor>
      </NumberField.ScrubArea>

      <NumberField.Group>
        <NumberField.Decrement aria-label="Decrease" icon={<MinusIcon />} />
        <NumberField.Input />
        <NumberField.Increment aria-label="Increase" icon={<PlusIcon />} />
      </NumberField.Group>
    </NumberField.Root>
  );
}

function CursorGrowIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="black"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

function PlusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
    </svg>
  );
}

function MinusIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H10" />
    </svg>
  );
}
