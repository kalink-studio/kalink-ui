import {
  assignVars,
  createThemeContract,
  type StyleRule,
} from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { createResponsiveVariants, defaultMedia, sys } from '../../styles';
import { components } from '../../styles/layers.css';
import {
  createSpacingVarStyles,
  gridAlignContentStyles,
  gridAlignItemsStyles,
  gridJustifyContentStyles,
  gridJustifyItemsStyles,
} from '../layout-maps';

export const gridVars = createThemeContract({
  spacing: {
    gap: null,
  },
  columnSpacing: {
    gap: null,
  },
  rowSpacing: {
    gap: null,
  },
  layout: {
    minCellSize: null,
  },
});

const gridSpacingDefaults = assignVars(gridVars.spacing, {
  gap: sys.spacing[0],
});

const gridLayoutDefaults = assignVars(gridVars.layout, {
  minCellSize: '250px',
});

// Shared variant style maps so we can reuse them for responsive overrides
export const gridSpacingStyles = createSpacingVarStyles(
  gridVars.spacing,
  'gap',
);

export const gridColumnSpacingStyles = createSpacingVarStyles(
  gridVars.columnSpacing,
  'columnGap',
);

export const gridRowSpacingStyles = createSpacingVarStyles(
  gridVars.rowSpacing,
  'rowGap',
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
  columnCountValues.map((n) => [
    n,
    {
      '@layer': {
        [components]: {
          gridTemplateColumns: `repeat(${n}, 1fr)`,
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
        gridTemplateColumns: `repeat(auto-fill, minmax(min(${gridVars.layout.minCellSize}, 100%), 1fr))`,
      },
    },
  },
  fit: {
    '@layer': {
      [components]: {
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${gridVars.layout.minCellSize}, 100%), 1fr))`,
      },
    },
  },
} as const;

export const gridRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'grid',
        gap: gridVars.spacing.gap,

        vars: {
          ...gridSpacingDefaults,
          ...gridLayoutDefaults,
        },
      },
    },
  },

  variants: {
    /**
     * The spacing between the grid cell
     */
    spacing: gridSpacingStyles,

    /**
     * The spacing between columns only
     */
    columnSpacing: gridColumnSpacingStyles,

    /**
     * The spacing between rows only
     */
    rowSpacing: gridRowSpacingStyles,

    /**
     * Force a fixed number of columns
     */
    columns: gridColumnsStyles,

    /**
     * Whether to use auto-fill (default) or auto-fit
     */
    autoLayout: autoLayoutStyles,

    /**
     * Grid item alignment along inline axis
     */
    justifyItems: gridJustifyItemsStyles,

    /**
     * Grid item alignment along block axis
     */
    alignItems: gridAlignItemsStyles,

    /**
     * Content alignment within the grid inline axis
     */
    justifyContent: gridJustifyContentStyles,

    /**
     * Content alignment within the grid block axis
     */
    alignContent: gridAlignContentStyles,
  },
});

export type GridVariants = NonNullable<RecipeVariants<typeof gridRecipe>>;

export const spacingAt = createResponsiveVariants({
  styles: gridSpacingStyles,
  media: defaultMedia,
});

export const columnSpacingAt = createResponsiveVariants({
  styles: gridColumnSpacingStyles,
  media: defaultMedia,
});

export const rowSpacingAt = createResponsiveVariants({
  styles: gridRowSpacingStyles,
  media: defaultMedia,
});

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
