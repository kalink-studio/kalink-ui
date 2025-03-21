import { createVar } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { mapContractVars, sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const colorForeground = createVar();
export const colorBackground = createVar();

export const boxRecipe = recipe({
  variants: {
    /**
     * The main variation of the box
     */
    variant: {
      solid: {
        '@layer': {
          [components]: {
            color: colorForeground,
            backgroundColor: colorBackground,
          },

          vars: {
            [colorForeground]: sys.color.foreground,
            [colorBackground]: sys.color.background,
          },
        },
      },

      outline: {
        '@layer': {
          [components]: {
            color: colorBackground,
            backgroundColor: 'transparent',

            borderColor: colorBackground,
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
