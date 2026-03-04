import { ComponentProps } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Button } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    children: 'Submit',
    variant: 'solid',
    tone: 'primary',
    size: 'md',
    flow: 'default',
    disabled: false,
    loading: false,
  },
  argTypes: {
    render: {
      control: false,
    },
    icon: {
      control: false,
    },
    className: {
      control: false,
    },
    children: {
      control: {
        type: 'text',
      },
    },
    size: {
      control: {
        type: 'inline-radio',
      },
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /submit/i });
    await userEvent.click(button);
    await expect(button).toBeEnabled();
  },
};

export const IconAndText: Story = {
  render: ({ 'aria-label': ariaLabel, children, ...args }) => (
    <Button icon={<ArrowRightIcon />} {...args}>
      {children!}
    </Button>
  ),
};

export const IconOnly: Story = {
  render: ({ children, icon, ...args }) => (
    <Button icon={<PlusIcon />} aria-label="Create item" {...args} />
  ),
};

function ArrowRightIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M5 12h14" strokeWidth="1.75" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M12 5v14" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M5 12h14" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
