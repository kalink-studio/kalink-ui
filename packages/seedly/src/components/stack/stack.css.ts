import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys } from '../../styles';
import { components } from '../../styles/layers.css';
import {
  createResponsiveVariants,
  defaultMedia,
} from '../../styles/responsive';
import { createSpacingVarStyles, flexAlignItemsStyles } from '../layout-maps';

export const stackVars = createThemeContract({
  spacing: {
    gap: null,
  },
});

const stackSpacingDefaults = assignVars(stackVars.spacing, {
  gap: sys.spacing[0],
});

// Shared variant style maps so we can reuse them for responsive overrides
export const stackSpacingStyles = createSpacingVarStyles(stackVars.spacing);

export const stackAlignStyles = flexAlignItemsStyles;

export const stackRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: stackVars.spacing.gap,

        vars: {
          ...stackSpacingDefaults,
        },
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
