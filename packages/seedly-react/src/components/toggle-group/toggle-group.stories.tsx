import { expect, userEvent, within } from 'storybook/test';

import { ToggleGroup, ToggleGroupItem } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';

const meta = {
  title: 'Components/Toggle Group',
  component: ToggleGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: () => <Example />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const center = canvas.getByRole('button', { name: /align center/i });
    await userEvent.click(center);
    await expect(center).toHaveAttribute('aria-pressed', 'true');
  },
};

function Example() {
  return (
    <ToggleGroup defaultValue={['left']}>
      <ToggleGroupItem
        aria-label="Align left"
        value="left"
        icon={<AlignLeftIcon />}
      />
      <ToggleGroupItem
        aria-label="Align center"
        value="center"
        icon={<AlignCenterIcon />}
      />
      <ToggleGroupItem
        aria-label="Align right"
        value="right"
        icon={<AlignRightIcon />}
      />
    </ToggleGroup>
  );
}

function AlignLeftIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 16 16"
      stroke="currentcolor"
      strokeLinecap="round"
      {...props}
    >
      <path d="M2.5 3.5H13.5" />
      <path d="M2.5 9.5H13.5" />
      <path d="M2.5 6.5H10.5" />
      <path d="M2.5 12.5H10.5" />
    </svg>
  );
}

function AlignCenterIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 16 16"
      stroke="currentcolor"
      strokeLinecap="round"
      {...props}
    >
      <path d="M3 3.5H14" />
      <path d="M3 9.5H14" />
      <path d="M4.5 6.5H12.5" />
      <path d="M4.5 12.5H12.5" />
    </svg>
  );
}

function AlignRightIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 16 16"
      stroke="currentcolor"
      strokeLinecap="round"
      {...props}
    >
      <path d="M2.5 3.5H13.5" />
      <path d="M2.5 9.5H13.5" />
      <path d="M5.5 6.5H13.5" />
      <path d="M5.5 12.5H13.5" />
    </svg>
  );
}
