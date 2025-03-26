import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { mapContractVars, sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const headingRoot = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
  },

  variants: {
    align: {
      start: {
        '@layer': {
          [components]: {
            alignItems: 'flex-start',
            textAlign: 'start',
          },
        },
      },
      center: {
        '@layer': {
          [components]: {
            alignItems: 'center',
            textAlign: 'center',
          },
        },
      },
      end: {
        '@layer': {
          [components]: {
            alignItems: 'flex-end',
            textAlign: 'end',
          },
        },
      },
    },

    spacing: mapContractVars(sys.spacing, (key) => ({
      '@layer': {
        [components]: {
          gap: sys.spacing[key],
        },
      },
    })),
  },
});

export type HeadingRootVariants = NonNullable<
  RecipeVariants<typeof headingRoot>
>;
