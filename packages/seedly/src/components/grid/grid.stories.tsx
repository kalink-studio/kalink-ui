import { FunctionComponent } from 'react';

import {
  argTypesFromRecipe,
  CommonArgs,
  commonArgs,
} from '../../utils/arg-types';

import { Grid } from './grid';
import { GridChild } from './grid-child';
import { gridRecipe } from './grid.css';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  subcomponents: {
    GridChild: GridChild as FunctionComponent<unknown>,
  },
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

export const FixedColumns: Story = {
  args: {
    columns: { xs: 2, md: 3 },
    spacing: 4,
    justifyItems: 'stretch',
  },
};

export const AutoFitAligned: Story = {
  args: {
    minSize: '200px',
    fit: 'fit',
    spacing: { xs: 2, md: 6 },
    justifyContent: 'spaceBetween',
    alignContent: 'start',
  },
};

export const WithChildSpans: Story = {
  args: {
    minSize: '120px',
    spacing: 3,
    children: (
      <>
        <GridChild colSpan={{ xs: 2, md: 3 }}>Span 2 (xs), 3 (md)</GridChild>
        <GridChild>Item</GridChild>
        <GridChild rowSpan={2}>Row span 2</GridChild>
        <GridChild colStart={1} colEnd={-1}>
          Start 1 / End -1
        </GridChild>
        <GridChild justifySelf="center" alignSelf="end">
          Self centered/bottom
        </GridChild>
        <GridChild>Item</GridChild>
        <GridChild>Item</GridChild>
        <GridChild>Item</GridChild>
      </>
    ),
  },
};
