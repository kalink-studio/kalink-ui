import {
  argTypesFromRecipe,
  CommonArgs,
  commonArgs,
} from '../../utils/arg-types';

import { Box } from './box';
import { boxRecipe } from './box.css';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Box',
  component: Box,
  tags: ['autodocs'],
  args: {
    children: 'Box content',
  },
  argTypes: {
    ...argTypesFromRecipe(boxRecipe),

    ...commonArgs([
      CommonArgs.COMPOSABLE,
      CommonArgs.POLYMORPHIC,
      CommonArgs.STYLABLE,
      CommonArgs.REFERABLE,
    ]),
  },
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {};
