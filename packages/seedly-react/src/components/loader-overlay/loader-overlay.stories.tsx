import { LoaderOverlay } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Feedback/LoaderOverlay',
  component: LoaderOverlay,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
  },
  args: {
    position: 'absolute',
    tone: 'neutral',
    spacing: 2,
    text: 'Loading content...',
  },
  argTypes: {
    position: {
      control: { type: 'inline-radio' },
      options: ['absolute', 'relative'],
    },
    tone: {
      control: { type: 'select' },
      options: ['neutral', 'primary', 'secondary', 'tertiary', 'error'],
    },
    spacing: {
      control: { type: 'select' },
      options: [0, 2, 4, 6, 8, 10, 12],
    },
  },
} satisfies Meta<typeof LoaderOverlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ minHeight: '16rem', position: 'relative', padding: '2rem' }}>
      <div>Underlying content</div>
      <LoaderOverlay {...args} />
    </div>
  ),
};

export const WithoutText: Story = {
  args: {
    text: undefined,
  },
  render: (args) => (
    <div style={{ minHeight: '16rem', position: 'relative', padding: '2rem' }}>
      <div>Underlying content</div>
      <LoaderOverlay {...args} />
    </div>
  ),
};
