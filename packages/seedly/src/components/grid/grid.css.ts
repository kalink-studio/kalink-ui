import { createVar, type StyleRule } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import {
  createResponsiveVariants,
  defaultMedia,
  mapContractVars,
  sys,
} from '../../styles';
import { components } from '../../styles/layers.css';

export const minSizeVar = createVar();

// Shared variant style maps so we can reuse them for responsive overrides
export const gridSpacingStyles = mapContractVars(sys.spacing, (key) => ({
  '@layer': {
    [components]: {
      gap: sys.spacing[key],
    },
  },
}));

export const gridColumnSpacingStyles = mapContractVars(sys.spacing, (key) => ({
  '@layer': {
    [components]: {
      columnGap: sys.spacing[key],
    },
  },
}));

export const gridRowSpacingStyles = mapContractVars(sys.spacing, (key) => ({
  '@layer': {
    [components]: {
      rowGap: sys.spacing[key],
    },
  },
}));

export const gridJustifyItemsStyles = {
  start: {
    '@layer': {
      [components]: { justifyItems: 'start' },
    },
  },
  end: {
    '@layer': {
      [components]: { justifyItems: 'end' },
    },
  },
  center: {
    '@layer': {
      [components]: { justifyItems: 'center' },
    },
  },
  stretch: {
    '@layer': {
      [components]: { justifyItems: 'stretch' },
    },
  },
} as const;

export const gridAlignItemsStyles = {
  start: {
    '@layer': {
      [components]: { alignItems: 'start' },
    },
  },
  end: {
    '@layer': {
      [components]: { alignItems: 'end' },
    },
  },
  center: {
    '@layer': {
      [components]: { alignItems: 'center' },
    },
  },
  stretch: {
    '@layer': {
      [components]: { alignItems: 'stretch' },
    },
  },
} as const;

export const gridJustifyContentStyles = {
  start: {
    '@layer': {
      [components]: { justifyContent: 'start' },
    },
  },
  end: {
    '@layer': {
      [components]: { justifyContent: 'end' },
    },
  },
  center: {
    '@layer': {
      [components]: { justifyContent: 'center' },
    },
  },
  spaceBetween: {
    '@layer': {
      [components]: { justifyContent: 'space-between' },
    },
  },
  spaceAround: {
    '@layer': {
      [components]: { justifyContent: 'space-around' },
    },
  },
  spaceEvenly: {
    '@layer': {
      [components]: { justifyContent: 'space-evenly' },
    },
  },
} as const;

export const gridAlignContentStyles = {
  start: {
    '@layer': {
      [components]: { alignContent: 'start' },
    },
  },
  end: {
    '@layer': {
      [components]: { alignContent: 'end' },
    },
  },
  center: {
    '@layer': {
      [components]: { alignContent: 'center' },
    },
  },
  spaceBetween: {
    '@layer': {
      [components]: { alignContent: 'space-between' },
    },
  },
  spaceAround: {
    '@layer': {
      [components]: { alignContent: 'space-around' },
    },
  },
  spaceEvenly: {
    '@layer': {
      [components]: { alignContent: 'space-evenly' },
    },
  },
  stretch: {
    '@layer': {
      [components]: { alignContent: 'stretch' },
    },
  },
} as const;

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
        gridTemplateColumns: `repeat(auto-fill, minmax(min(${minSizeVar}, 100%), 1fr))`,
      },
    },
  },
  fit: {
    '@layer': {
      [components]: {
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${minSizeVar}, 100%), 1fr))`,
      },
    },
  },
} as const;

export const gridRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'grid',

        vars: {
          [minSizeVar]: '250px',
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

// gridFitStyles now declared above for reuse

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
