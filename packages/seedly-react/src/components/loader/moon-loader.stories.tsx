import { MoonLoader } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Feedback/MoonLoader',
  component: MoonLoader,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    active: true,
    size: 'md',
    tone: 'neutral',
    forceMount: false,
  },
  argTypes: {
    active: {
      control: { type: 'boolean' },
    },
    forceMount: {
      control: { type: 'boolean' },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    tone: {
      control: { type: 'select' },
      options: ['neutral', 'primary', 'secondary', 'tertiary', 'error'],
    },
  },
} satisfies Meta<typeof MoonLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <MoonLoader active size="sm" />
      <MoonLoader active size="md" />
      <MoonLoader active size="lg" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <MoonLoader active tone="neutral" />
      <MoonLoader active tone="primary" />
      <MoonLoader active tone="secondary" />
      <MoonLoader active tone="tertiary" />
      <MoonLoader active tone="error" />
    </div>
  ),
};
