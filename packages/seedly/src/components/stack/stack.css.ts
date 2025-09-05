import { createVar } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys, mapContractVars } from '../../styles';
import { components } from '../../styles/layers.css';
import {
  createResponsiveVariants,
  defaultMedia,
} from '../../styles/responsive';

const spacing = createVar({
  syntax: '<length>',
  initialValue: sys.spacing['0'],
  inherits: false,
});

// Shared variant style maps so we can reuse them for responsive overrides
export const stackSpacingStyles = mapContractVars(sys.spacing, (key) => ({
  '@layer': {
    [components]: {
      vars: {
        [spacing]: sys.spacing[key],
      },
    },
  },
}));

export const stackAlignStyles = {
  start: {
    '@layer': {
      [components]: {
        alignItems: 'flex-start',
      },
    },
  },
  center: {
    '@layer': {
      [components]: {
        alignItems: 'center',
      },
    },
  },
  end: {
    '@layer': {
      [components]: {
        alignItems: 'flex-end',
      },
    },
  },
  stretch: {
    '@layer': {
      [components]: {
        alignItems: 'stretch',
      },
    },
  },
} as const;

export const stackRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: spacing,
      },
    },
  },

  variants: {
    /**
     * The spacing between items
     */
    spacing: stackSpacingStyles,

    /**
     * The alignment of items along the cross axis
     */
    align: stackAlignStyles,
  },
});

export type StackVariants = NonNullable<RecipeVariants<typeof stackRecipe>>;

export const spacingAt = createResponsiveVariants({
  styles: stackSpacingStyles,
  media: defaultMedia,
});

export const alignAt = createResponsiveVariants({
  styles: stackAlignStyles,
  media: defaultMedia,
});
