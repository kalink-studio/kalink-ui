import { assignVars, createThemeContract } from '@vanilla-extract/css';
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

export const clusterVars = createThemeContract({
  spacing: {
    gap: null,
  },
});

const clusterSpacingDefaults = assignVars(clusterVars.spacing, {
  gap: sys.spacing[0],
});

export const clusterSpacingStyles = mapContractVars(
  sys.spacing,
  clusterVars.spacing,
);

export const clusterJustifyStyles = flexJustifyContentStyles;

export const clusterAlignStyles = flexAlignItemsWithBaselineStyles;

export const clusterDirectionStyles = {
  row: {
    '@layer': {
      [components]: {
        flexDirection: 'row',
      },
    },
  },
  rowReverse: {
    '@layer': {
      [components]: {
        flexDirection: 'row-reverse',
      },
    },
  },
} as const;

export const clusterRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: clusterVars.spacing.gap,

        vars: {
          ...clusterSpacingDefaults,
        },
      },
    },
  },

  variants: {
    spacing: clusterSpacingStyles,
    justify: clusterJustifyStyles,
    align: clusterAlignStyles,
    direction: clusterDirectionStyles,
  },
});

export type ClusterVariants = NonNullable<RecipeVariants<typeof clusterRecipe>>;

export const justifyAt = createResponsiveVariants({
  styles: clusterJustifyStyles,
  media: defaultMedia,
});

export const alignAt = createResponsiveVariants({
  styles: clusterAlignStyles,
  media: defaultMedia,
});

export const directionAt = createResponsiveVariants({
  styles: clusterDirectionStyles,
  media: defaultMedia,
});
