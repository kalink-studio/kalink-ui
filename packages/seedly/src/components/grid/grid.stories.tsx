import {
  argTypesFromRecipe,
  CommonArgs,
  commonArgs,
} from '../../utils/arg-types';

import { Grid } from './grid';
import { gridRecipe } from './grid.css';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    ...argTypesFromRecipe(gridRecipe),

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
    minSize: '250px',

    children: (
      <>
        <div>Grid cell one</div>
        <div>Grid cell two</div>
        <div>Grid cell three</div>
        <div>Grid cell four</div>
        <div>Grid cell five</div>
        <div>Grid cell six</div>
        <div>Grid cell seven</div>
        <div>Grid cell eight</div>
      </>
    ),
  },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {};
