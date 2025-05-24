import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { mapContractVars, sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const clusterRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
    },
  },

  variants: {
    /**
     * The spacing between items
     */
    spacing: mapContractVars(sys.spacing, (key) => ({
      '@layer': {
        [components]: {
          gap: sys.spacing[key],
        },
      },
    })),

    /**
     * The alignment of items along the main axis
     */
    justify: {
      start: {
        '@layer': {
          [components]: {
            justifyContent: 'flex-start',
          },
        },
      },
      end: {
        '@layer': {
          [components]: {
            justifyContent: 'flex-end',
          },
        },
      },
      center: {
        '@layer': {
          [components]: {
            justifyContent: 'center',
          },
        },
      },
      spaceBetween: {
        '@layer': {
          [components]: {
            justifyContent: 'space-between',
          },
        },
      },
      spaceAround: {
        '@layer': {
          [components]: {
            justifyContent: 'space-around',
          },
        },
      },
      spaceEvenly: {
        '@layer': {
          [components]: {
            justifyContent: 'space-evenly',
          },
        },
      },
    },

    /**
     * The alignment of items along the cross axis
     */
    align: {
      start: {
        '@layer': {
          [components]: {
            alignItems: 'flex-start',
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
      center: {
        '@layer': {
          [components]: {
            alignItems: 'center',
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
      baseline: {
        '@layer': {
          [components]: {
            alignItems: 'baseline',
          },
        },
      },
    },

    direction: {
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
    },
  },
});

export type ClusterVariants = NonNullable<RecipeVariants<typeof clusterRecipe>>;
