import { argTypesFromRecipe } from '../../utils';

import { Box } from './box';
import { boxRecipe } from './box.css';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Box',
  component: Box,
  tags: ['autodocs'],
  args: {
    children: 'Box content',
  },
  argTypes: {
    ...argTypesFromRecipe(boxRecipe),
  },
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {};
