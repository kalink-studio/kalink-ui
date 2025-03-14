import {
  argTypesFromRecipe,
  CommonArgs,
  commonArgs,
} from '../../utils/arg-types';

import { Cover } from './cover';
import { coverRecipe } from './cover.css';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Cover',
  component: Cover,
  tags: ['autodocs'],
  argTypes: {
    ...argTypesFromRecipe(coverRecipe),

    ...commonArgs([
      CommonArgs.COMPOSABLE,
      CommonArgs.POLYMORPHIC,
      CommonArgs.STYLABLE,
      CommonArgs.REFERABLE,
    ]),

    minSize: {
      table: {
        category: 'Styling props',
      },
    },
  },
  args: {
    minSize: '30vh',

    children: (
      <>
        <div>Cover element one</div>
        <div data-cover-center>Cover element two</div>
        <div>Cover element three</div>
      </>
    ),
  },
} satisfies Meta<typeof Cover>;

export default meta;

type Story = StoryObj<typeof Cover>;

export const Default: Story = {};
