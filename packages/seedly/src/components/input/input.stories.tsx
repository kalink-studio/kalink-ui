import { responsiveSelectArg } from '../../utils';
import { FormField } from '../form-field';

import { Input } from './input';


import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Internal/Input',
  component: Input,
  tags: ['internal'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <FormField
        name="input"
        label="Input"
        errors=""
        hideErrorMessage={false}
        hideLabel={false}
      >
        <div style={{ width: 300 }}>
          <Story />
        </div>
      </FormField>
    ),
  ],
  args: {
    placeholder: 'Enter text...',
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
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const Plain: Story = {
  args: {
    variant: 'plain',
  },
};

export const Bare: Story = {
  args: {
    variant: 'bare',
  },
};

export const SizeSmall: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small input',
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'md',
    placeholder: 'Medium input',
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large input',
  },
};

export const WithStartAdornment: Story = {
  args: {
    startAdornment: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
    placeholder: 'Search...',
  },
};

export const WithEndAdornment: Story = {
  args: {
    endAdornment: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    type: 'password',
    placeholder: 'Password',
  },
};

export const WithBothAdornments: Story = {
  args: {
    startAdornment: '$',
    endAdornment: 'USD',
    placeholder: '0.00',
    type: 'number',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input',
  },
};
