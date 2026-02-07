import { CheckboxGroup } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Checkbox Group',
  component: CheckboxGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {};
