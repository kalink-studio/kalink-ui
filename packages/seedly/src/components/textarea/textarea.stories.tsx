import { responsiveSelectArg } from '../../utils';

import { Textarea } from './textarea';


import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Form/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    name: 'textarea',
    label: 'Field Label',
    errors: '',
    size: 'md',
    hideLabel: false,
    hideErrorMessage: false,
    disabled: false,
  },
  argTypes: {
    size: responsiveSelectArg({
      options: ['sm', 'md', 'lg'],
      summary: 'Responsive<InputSize>',
    }),
    variant: responsiveSelectArg({
      options: ['outlined', 'plain', 'bare'],
      summary: 'Responsive<InputVariant>',
    }),
    tone: responsiveSelectArg({
      options: ['neutral', 'primary', 'destructive', 'success'],
      summary: 'Responsive<Tone>',
    }),
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Enter your message here...',
  },
};

export const WithDescription: Story = {
  args: {
    description: 'Please provide additional details',
  },
};

export const WithError: Story = {
  args: {
    errors: 'This field is required',
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const WithRows: Story = {
  args: {
    rows: 6,
    placeholder: 'This textarea has 6 rows',
  },
};

export const HiddenLabel: Story = {
  args: {
    hideLabel: true,
    placeholder: 'Label is hidden but accessible',
  },
};
