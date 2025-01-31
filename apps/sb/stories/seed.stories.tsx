import { plantSeed } from '@kalink/ui/styles';

import { sprinkles, sprinklesProps } from '@/theme/sprinkles.css';
import {
  CommonArgs,
  commonArgs,
  argTypesFromSprinkles,
} from '@/utils/arg-types';

import type { Meta, StoryObj } from '@storybook/react';

const Sprout = plantSeed({ sprinkles });

const meta = {
  title: 'Styles/Sprout',
  component: Sprout,
  args: {
    children: 'Box content',
  },
  argTypes: {
    ...argTypesFromSprinkles({ props: sprinklesProps }),

    ...commonArgs([
      CommonArgs.COMPOSABLE,
      CommonArgs.POLYMORPHIC,
      CommonArgs.STYLABLE,
      CommonArgs.REFERABLE,
    ]),
  },
} satisfies Meta<typeof Sprout>;

export default meta;

type Story = StoryObj<typeof Sprout>;

export const Default: Story = {};

export const WithSprinklesProps: Story = {
  args: {
    padding: 'medium',
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center',
  },
};

export const UseElement: Story = {
  args: {
    use: 'h1',
  },
};
