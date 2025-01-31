import { Frame, frameRecipe } from '@kalink/ui/frame';

import { argTypesFromRecipe, CommonArgs, commonArgs } from '@/utils/arg-types';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Frame',
  component: Frame,
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
