import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { mapContractVars, sys } from '../../styles';
import { components } from '../../styles/layers.css';
import {
  createResponsiveVariants,
  defaultMedia,
} from '../../styles/responsive';
import { flexAlignItemsStyles } from '../layout/shared/maps';

export const stackVars = createThemeContract({
  spacing: {
    gap: null,
  },
});

const stackSpacingDefaults = assignVars(stackVars.spacing, {
  gap: sys.spacing[0],
});

export const stackSpacingStyles = mapContractVars(
  sys.spacing,
  stackVars.spacing,
);

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
    spacing: stackSpacingStyles,
    align: stackAlignStyles,
  },
});

export type StackVariants = NonNullable<RecipeVariants<typeof stackRecipe>>;

export const alignAt = createResponsiveVariants({
  styles: stackAlignStyles,
  media: defaultMedia,
});
