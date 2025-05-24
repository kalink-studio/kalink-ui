import { CommonArgs, commonArgs } from '../../utils/arg-types/common-args';

import { Select, SelectProps } from './select';
import { SelectItem } from './select-item';

import type { Meta, StoryObj } from '@storybook/react';

type StoryArgs = SelectProps & {
  withError: boolean;
  options: { label: string; value: string }[];
};

const meta = {
  title: 'Form/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    disabled: false,
    defaultValue: undefined,
    name: 'nationality',
    label: 'Nationality',
    description: 'Select your nationality.',
    options: [
      { label: 'Chinese', value: 'che' },
      { label: 'Singaporean', value: 'sg' },
      { label: 'Malaysian', value: 'my' },
      { label: 'Indonesian', value: 'id' },
      { label: 'Thai', value: 'th' },
      { label: 'Vietnamese', value: 'vn' },
    ],
  },
  argTypes: {
    ...commonArgs([CommonArgs.COMPOSABLE, CommonArgs.STYLABLE]),
    onBlur: { control: false, table: { category: 'Intrinsic props' } },
    label: { table: { category: 'Intrinsic props' } },
    container: { table: { category: 'Intrinsic props' } },
    description: { table: { category: 'Intrinsic props' } },
    disabled: { table: { category: 'Intrinsic props' } },
    name: { table: { category: 'Intrinsic props' } },
    placeholder: { table: { category: 'Intrinsic props' } },
  },
  render: ({ options, ...args }) => {
    return (
      <Select {...args}>
        {options.map((option) => {
          return (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          );
        })}
      </Select>
    );
  },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    value: 'che',
  },
};

export const Error: Story = {
  args: {
    errors: 'Error message',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
