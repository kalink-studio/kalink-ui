import { TextField } from './text-field';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Form/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    label: 'Field Label',
    size: 'md',
    type: 'text',
    hideLabel: false,
    hideErrorMessage: false,
    disabled: false,
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Placeholder',
  },
};

export const WithDescription: Story = {
  args: {
    description: 'Description',
  },
};

export const WithError: Story = {
  args: {
    errors: 'Error message',
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};
