import { responsiveSelectArg } from '../../utils';

import { Label } from './label';


import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Internal/Label',
  component: Label,
  tags: ['internal'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Field Label',
  },
  argTypes: {
    size: responsiveSelectArg({
      options: ['sm', 'md', 'lg'],
      summary: 'Responsive<LabelSize>',
    }),
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const SizeSmall: Story = {
  args: {
    size: 'sm',
    children: 'Small Label',
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'md',
    children: 'Medium Label',
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'lg',
    children: 'Large Label',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Label',
  },
};

export const WithError: Story = {
  args: {
    error: true,
    children: 'Label with Error',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Label size="sm">Small Label</Label>
      <Label size="md">Medium Label</Label>
      <Label size="lg">Large Label</Label>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Label>Default Label</Label>
      <Label disabled>Disabled Label</Label>
      <Label error>Error Label</Label>
    </div>
  ),
};
