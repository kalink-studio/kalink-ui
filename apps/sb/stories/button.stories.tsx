import { Button, buttonRecipe } from '@kalink/ui/button';

import { CommonArgs, commonArgs, argTypesFromRecipe } from '@/utils/arg-types';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/Button',
  component: Button,
  args: {
    children: 'Button label',
  },
  argTypes: {
    ...argTypesFromRecipe(buttonRecipe),

    ...commonArgs([
      CommonArgs.COMPOSABLE,
      CommonArgs.POLYMORPHIC,
      CommonArgs.STYLABLE,
      CommonArgs.REFERABLE,
    ]),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};
