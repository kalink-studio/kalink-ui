import {
  argTypesFromRecipe,
  CommonArgs,
  commonArgs,
} from '../../utils/arg-types';

import { Center } from './center';
import { centerRecipe } from './center.css';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Center',
  component: Center,
  tags: ['autodocs'],
  args: {
    children: 'Centered content',
  },
  argTypes: {
    ...argTypesFromRecipe(centerRecipe),

    ...commonArgs([
      CommonArgs.COMPOSABLE,
      CommonArgs.POLYMORPHIC,
      CommonArgs.STYLABLE,
      CommonArgs.REFERABLE,
    ]),
  },
} satisfies Meta<typeof Center>;

export default meta;

type Story = StoryObj<typeof Center>;

export const Default: Story = {};
