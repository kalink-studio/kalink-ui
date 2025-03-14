import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { components } from '../../styles/layers.css';
import { sys } from '../../styles/system-contract.css';
import { mapContractVars } from '../../utils/map-contract-vars';

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
    spacing: mapContractVars(sys.spacing, (key) => ({
      '@layer': {
        [components]: {
          gap: sys.spacing[key],
        },
      },
    })),

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
  },
});

export type ClusterVariants = NonNullable<RecipeVariants<typeof clusterRecipe>>;
