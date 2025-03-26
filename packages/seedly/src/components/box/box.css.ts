import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { mapContractVars, sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const boxRecipe = recipe({
  variants: {
    /**
     * The main variation of the box
     */
    variant: {
      solid: {
        '@layer': {
          [components]: {
            color: sys.color.foreground,
            backgroundColor: sys.color.background,
          },
        },
      },

      outline: {
        '@layer': {
          [components]: {
            color: sys.color.foreground,
            backgroundColor: 'transparent',

            borderColor: sys.color.foreground,
            borderStyle: 'solid',
            borderWidth: '1px',
          },
        },
      },
    },

    /**
     * The spacing between the box borders and its contents
     */
    spacing: mapContractVars(sys.spacing, (key) => ({
      '@layer': {
        [components]: {
          padding: sys.spacing[key],
        },
      },
    })),

    /**
     * The elevation of the box
     */
    elevation: mapContractVars(sys.elevation, (key) => ({
      '@layer': {
        [components]: {
          boxShadow: sys.elevation[key],
        },
      },
    })),

    /**
     * The radius of the box
     */
    radius: mapContractVars(sys.shape.corner, (key) => ({
      '@layer': {
        [components]: {
          borderRadius: sys.shape.corner[key],
        },
      },
    })),
  },
});

export type BoxVariants = NonNullable<RecipeVariants<typeof boxRecipe>>;
