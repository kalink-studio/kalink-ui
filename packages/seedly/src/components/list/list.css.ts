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
import { components } from '../../styles/layers.css';
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

export const listItemSpacingStyles = mapContractVars(sys.spacing, {
  itemSpacing: listVars.spacing.itemSpacing,
});

export const listItemInlineSpacingStyles = mapContractVars(sys.spacing, {
  itemInlineSpacing: listVars.spacing.itemInlineSpacing,
});

export const listOrientationStyles = {
  vertical: {
    '@layer': {
      [components]: {
        flexDirection: 'column',
      },
    },
  },
  horizontal: {
    '@layer': {
      [components]: {
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
      [components]: {
        listStyle: 'none',
      },
    },
  },
  disc: { '@layer': { [components]: { listStyle: 'disc' } } },
  circle: { '@layer': { [components]: { listStyle: 'circle' } } },
  square: { '@layer': { [components]: { listStyle: 'square' } } },
  decimal: { '@layer': { [components]: { listStyle: 'decimal' } } },
  'lower-alpha': { '@layer': { [components]: { listStyle: 'lower-alpha' } } },
  'upper-alpha': { '@layer': { [components]: { listStyle: 'upper-alpha' } } },
  'lower-roman': { '@layer': { [components]: { listStyle: 'lower-roman' } } },
  'upper-roman': { '@layer': { [components]: { listStyle: 'upper-roman' } } },
} as const;

export const listMarkerPositionStyles = {
  inside: {
    '@layer': {
      [components]: {
        listStylePosition: 'inside',
      },
    },
  },
  outside: {
    '@layer': {
      [components]: {
        listStylePosition: 'outside',
      },
    },
  },
} as const;

export const listRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
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
          [components]: {
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
          [components]: {
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
          [components]: {
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
          [components]: {
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
          [components]: {
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
          [components]: {
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
    [components]: {
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
