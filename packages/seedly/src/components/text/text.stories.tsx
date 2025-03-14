import {
  CommonArgs,
  commonArgs,
  argTypesFromRecipe,
} from '../../utils/arg-types';

import { Text } from './text';
import { textRecipe } from './text.css';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    children: 'Button label',
  },
  argTypes: {
    ...argTypesFromRecipe(textRecipe),

    ...commonArgs([
      CommonArgs.COMPOSABLE,
      CommonArgs.POLYMORPHIC,
      CommonArgs.STYLABLE,
      CommonArgs.REFERABLE,
    ]),
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {};
