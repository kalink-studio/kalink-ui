import { createVar } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { components } from '../../styles/layers.css';
import { sys } from '../../styles/system-contract.css';
import { mapContractVars } from '../../utils/map-contract-vars';

export const colorForeground = createVar();
export const colorBackground = createVar();

export const boxRecipe = recipe({
  variants: {
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

    spacing: mapContractVars(sys.spacing, (key) => ({
      '@layer': {
        [components]: {
          padding: sys.spacing[key],
        },
      },
    })),

    elevation: mapContractVars(sys.elevation, (key) => ({
      '@layer': {
        [components]: {
          boxShadow: sys.elevation[key],
        },
      },
    })),

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
