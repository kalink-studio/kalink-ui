import { argTypesFromRecipe, CommonArgs, commonArgs } from '@/utils/arg-types';

import { Frame } from './frame';
import { frameRecipe } from './frame.css';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Frame',
  component: Frame,
  tags: ['autodocs'],
  argTypes: {
    ...argTypesFromRecipe(frameRecipe),

    ...commonArgs([
      CommonArgs.COMPOSABLE,
      CommonArgs.POLYMORPHIC,
      CommonArgs.STYLABLE,
      CommonArgs.REFERABLE,
    ]),

    ratio: {
      table: {
        category: 'Recipe props',
      },
    },
  },
  args: {
    ratio: '16:9',

    children: <div>Frame element</div>,
  },
} satisfies Meta<typeof Frame>;

export default meta;

type Story = StoryObj<typeof Frame>;

export const Default: Story = {};
