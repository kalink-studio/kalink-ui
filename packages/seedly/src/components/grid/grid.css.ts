import {
  assignVars,
  createThemeContract,
  type StyleRule,
} from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import {
  createResponsiveVariants,
  defaultMedia,
  mapContractVars,
  sys,
} from '../../styles';
import { components } from '../../styles/layers.css';
import {
  gridAlignContentStyles,
  gridAlignItemsStyles,
  gridJustifyContentStyles,
  gridJustifyItemsStyles,
} from '../layout/shared/maps';

export const gridVars = createThemeContract({
  columnSpacing: {
    rootColumnGap: null,
  },
  layout: {
    rootMinCellSize: null,
  },
  rowSpacing: {
    rootRowGap: null,
  },
  spacing: {
    rootGap: null,
  },
});

const gridDefaults = assignVars(gridVars, {
  columnSpacing: {
    rootColumnGap: gridVars.spacing.rootGap,
  },
  layout: {
    rootMinCellSize: `calc(${sys.layout.measure} / 3)`,
  },
  rowSpacing: {
    rootRowGap: gridVars.spacing.rootGap,
  },
  spacing: {
    rootGap: sys.spacing[0],
  },
});

export const gridSpacingStyles = mapContractVars(sys.spacing, gridVars.spacing);

export const gridColumnSpacingStyles = mapContractVars(
  sys.spacing,
  gridVars.columnSpacing,
);

export const gridRowSpacingStyles = mapContractVars(
  sys.spacing,
  gridVars.rowSpacing,
);

export {
  gridAlignContentStyles,
  gridAlignItemsStyles,
  gridJustifyContentStyles,
  gridJustifyItemsStyles,
};

const columnCountValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
type ColumnCount = (typeof columnCountValues)[number];

const gridColumnsStyles = Object.fromEntries(
  columnCountValues.map((count) => [
    count,
    {
      '@layer': {
        [components]: {
          gridTemplateColumns: `repeat(${count}, 1fr)`,
        },
      },
    },
  ]),
) as Record<
  ColumnCount,
  { '@layer': Record<string, { gridTemplateColumns: string }> }
>;

export const autoLayoutStyles = {
  fill: {
    '@layer': {
      [components]: {
        gridTemplateColumns: `repeat(auto-fill, minmax(min(${gridVars.layout.rootMinCellSize}, 100%), 1fr))`,
      },
    },
  },
  fit: {
    '@layer': {
      [components]: {
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${gridVars.layout.rootMinCellSize}, 100%), 1fr))`,
      },
    },
  },
} as const;

export const gridRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        vars: gridDefaults,

        display: 'grid',

        columnGap: gridVars.columnSpacing.rootColumnGap,
        gap: gridVars.spacing.rootGap,
        rowGap: gridVars.rowSpacing.rootRowGap,
      },
    },
  },

  variants: {
    spacing: gridSpacingStyles,
    columnSpacing: gridColumnSpacingStyles,
    rowSpacing: gridRowSpacingStyles,
    columns: gridColumnsStyles,
    autoLayout: autoLayoutStyles,
    justifyItems: gridJustifyItemsStyles,
    alignItems: gridAlignItemsStyles,
    justifyContent: gridJustifyContentStyles,
    alignContent: gridAlignContentStyles,
  },
});

export type GridVariants = NonNullable<RecipeVariants<typeof gridRecipe>>;

export const columnsAt = createResponsiveVariants({
  styles: gridColumnsStyles as Record<ColumnCount, StyleRule | StyleRule[]>,
  media: defaultMedia,
});

export const autoLayoutAt = createResponsiveVariants({
  styles: autoLayoutStyles,
  media: defaultMedia,
});

export const justifyItemsAt = createResponsiveVariants({
  styles: gridJustifyItemsStyles,
  media: defaultMedia,
});

export const alignItemsAt = createResponsiveVariants({
  styles: gridAlignItemsStyles,
  media: defaultMedia,
});

export const justifyContentAt = createResponsiveVariants({
  styles: gridJustifyContentStyles,
  media: defaultMedia,
});

export const alignContentAt = createResponsiveVariants({
  styles: gridAlignContentStyles,
  media: defaultMedia,
});
