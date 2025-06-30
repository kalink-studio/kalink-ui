import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { mapContractVars, sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const headingRoot = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexDirection: 'column',
      },
    },
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
      justify: {
        '@layer': {
          [components]: {
            alignItems: 'stretch',
            textAlign: 'justify',
          },
        },
      },
    },
  },
});

export const pretitle = recipe({
  variants: {
    spacing: mapContractVars(sys.spacing, (key) => ({
      '@layer': {
        [components]: {
          marginBlockEnd: sys.spacing[key],
        },
      },
    })),
  },
});

export const subtitle = recipe({
  variants: {
    spacing: mapContractVars(sys.spacing, (key) => ({
      '@layer': {
        [components]: {
          marginBlockStart: sys.spacing[key],
        },
      },
    })),
  },
});

export type HeadingRootVariants = NonNullable<
  RecipeVariants<typeof headingRoot>
>;
