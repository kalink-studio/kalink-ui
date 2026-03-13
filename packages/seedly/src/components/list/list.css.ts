import {
  assignVars,
  createThemeContract,
  globalStyle,
} from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import {
  createResponsiveVariants,
  defaultMedia,
  mapContractVars,
  sys,
} from '../../styles';
import { layouts } from '../../styles/layers.css';
import {
  flexAlignItemsWithBaselineStyles,
  flexJustifyContentStyles,
} from '../layout/shared/maps';

export const listVars = createThemeContract({
  spacing: {
    itemSpacing: null,
    itemInlineSpacing: null,
    rootPaddingInlineStart: null,
    itemPaddingBlock: null,
    itemPaddingInline: null,
  },
});

const listDefaults = assignVars(listVars, {
  spacing: {
    itemSpacing: sys.spacing[0],
    itemInlineSpacing: sys.spacing[8],
    rootPaddingInlineStart: sys.spacing[0],
    itemPaddingBlock: sys.spacing[0],
    itemPaddingInline: sys.spacing[0],
  },
});

export const listItemSpacingStyles = mapContractVars(
  sys.spacing,
  {
    itemSpacing: listVars.spacing.itemSpacing,
  },
  layouts,
);

export const listItemInlineSpacingStyles = mapContractVars(
  sys.spacing,
  {
    itemInlineSpacing: listVars.spacing.itemInlineSpacing,
  },
  layouts,
);

export const listOrientationStyles = {
  vertical: {
    '@layer': {
      [layouts]: {
        flexDirection: 'column',
      },
    },
  },
  horizontal: {
    '@layer': {
      [layouts]: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        listStylePosition: 'inside',
        vars: {
          [listVars.spacing.rootPaddingInlineStart]: sys.spacing[0],
        },
      },
    },
  },
} as const;

export const listStyleStyles = {
  none: {
    '@layer': {
      [layouts]: {
        listStyle: 'none',
      },
    },
  },
  disc: { '@layer': { [layouts]: { listStyle: 'disc' } } },
  circle: { '@layer': { [layouts]: { listStyle: 'circle' } } },
  square: { '@layer': { [layouts]: { listStyle: 'square' } } },
  decimal: { '@layer': { [layouts]: { listStyle: 'decimal' } } },
  'lower-alpha': { '@layer': { [layouts]: { listStyle: 'lower-alpha' } } },
  'upper-alpha': { '@layer': { [layouts]: { listStyle: 'upper-alpha' } } },
  'lower-roman': { '@layer': { [layouts]: { listStyle: 'lower-roman' } } },
  'upper-roman': { '@layer': { [layouts]: { listStyle: 'upper-roman' } } },
} as const;

export const listMarkerPositionStyles = {
  inside: {
    '@layer': {
      [layouts]: {
        listStylePosition: 'inside',
      },
    },
  },
  outside: {
    '@layer': {
      [layouts]: {
        listStylePosition: 'outside',
      },
    },
  },
} as const;

export const listRecipe = recipe({
  base: {
    '@layer': {
      [layouts]: {
        vars: listDefaults,

        margin: 0,
        display: 'flex',
        gap: listVars.spacing.itemSpacing,
        listStylePosition: 'outside',
        paddingInlineStart: listVars.spacing.rootPaddingInlineStart,
      },
    },
  },

  variants: {
    orientation: listOrientationStyles,
    listStyle: listStyleStyles,
    markerPosition: listMarkerPositionStyles,
    itemSpacing: listItemSpacingStyles,
    itemInlineSpacing: listItemInlineSpacingStyles,
    justify: flexJustifyContentStyles,
    align: flexAlignItemsWithBaselineStyles,
  },

  compoundVariants: [
    {
      variants: {
        orientation: 'vertical',
        markerPosition: 'outside',
      },
      style: {
        '@layer': {
          [layouts]: {
            vars: {
              [listVars.spacing.rootPaddingInlineStart]:
                listVars.spacing.itemInlineSpacing,
              [listVars.spacing.itemPaddingBlock]: sys.spacing[0],
              [listVars.spacing.itemPaddingInline]:
                listVars.spacing.itemInlineSpacing,
            },
          },
        },
      },
    },
    {
      variants: {
        orientation: 'vertical',
        markerPosition: 'inside',
      },
      style: {
        '@layer': {
          [layouts]: {
            vars: {
              [listVars.spacing.rootPaddingInlineStart]: sys.spacing[0],
              [listVars.spacing.itemPaddingBlock]: sys.spacing[0],
              [listVars.spacing.itemPaddingInline]:
                listVars.spacing.itemInlineSpacing,
            },
          },
        },
      },
    },
    {
      variants: {
        orientation: 'vertical',
        listStyle: 'none',
      },
      style: {
        '@layer': {
          [layouts]: {
            vars: {
              [listVars.spacing.rootPaddingInlineStart]: sys.spacing[0],
              [listVars.spacing.itemPaddingBlock]: sys.spacing[0],
              [listVars.spacing.itemPaddingInline]: sys.spacing[0],
            },
          },
        },
      },
    },
    {
      variants: {
        orientation: 'horizontal',
        markerPosition: 'inside',
      },
      style: {
        '@layer': {
          [layouts]: {
            listStylePosition: 'inside',
            vars: {
              [listVars.spacing.rootPaddingInlineStart]: sys.spacing[0],
              [listVars.spacing.itemPaddingBlock]: sys.spacing[4],
              [listVars.spacing.itemPaddingInline]:
                listVars.spacing.itemInlineSpacing,
            },
          },
        },
      },
    },
    {
      variants: {
        orientation: 'horizontal',
        markerPosition: 'outside',
      },
      style: {
        '@layer': {
          [layouts]: {
            listStylePosition: 'inside',
            vars: {
              [listVars.spacing.rootPaddingInlineStart]: sys.spacing[0],
              [listVars.spacing.itemPaddingBlock]: sys.spacing[4],
              [listVars.spacing.itemPaddingInline]:
                listVars.spacing.itemInlineSpacing,
            },
          },
        },
      },
    },
    {
      variants: {
        orientation: 'horizontal',
        listStyle: 'none',
      },
      style: {
        '@layer': {
          [layouts]: {
            vars: {
              [listVars.spacing.rootPaddingInlineStart]: sys.spacing[0],
              [listVars.spacing.itemPaddingBlock]: sys.spacing[4],
              [listVars.spacing.itemPaddingInline]:
                listVars.spacing.itemInlineSpacing,
            },
          },
        },
      },
    },
  ],
});

globalStyle(`${listRecipe.classNames.base} > li`, {
  '@layer': {
    [layouts]: {
      paddingBlock: listVars.spacing.itemPaddingBlock,
      paddingInlineStart: listVars.spacing.itemPaddingInline,
    },
  },
});

export type ListVariants = NonNullable<RecipeVariants<typeof listRecipe>>;

export const orientationAt = createResponsiveVariants({
  styles: listOrientationStyles,
  media: defaultMedia,
});

export const justifyAt = createResponsiveVariants({
  styles: flexJustifyContentStyles,
  media: defaultMedia,
});

export const alignAt = createResponsiveVariants({
  styles: flexAlignItemsWithBaselineStyles,
  media: defaultMedia,
});

export const markerPositionAt = createResponsiveVariants({
  styles: listMarkerPositionStyles,
  media: defaultMedia,
});
