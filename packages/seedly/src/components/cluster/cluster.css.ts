import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import {
  createResponsiveVariants,
  defaultMedia,
  mapContractVars,
  sys,
} from '../../styles';
import { components } from '../../styles/layers.css';

// Shared variant style maps so we can reuse them for responsive overrides
export const clusterSpacingStyles = mapContractVars(sys.spacing, (key) => ({
  '@layer': {
    [components]: {
      gap: sys.spacing[key],
    },
  },
}));

export const clusterJustifyStyles = {
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
} as const;

export const clusterAlignStyles = {
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
} as const;

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
    spacing: clusterSpacingStyles,

    /**
     * The alignment of items along the main axis
     */
    justify: clusterJustifyStyles,

    /**
     * The alignment of items along the cross axis
     */
    align: clusterAlignStyles,

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

export const spacingAt = createResponsiveVariants({
  styles: clusterSpacingStyles,
  media: defaultMedia,
});

export const justifyAt = createResponsiveVariants({
  styles: clusterJustifyStyles,
  media: defaultMedia,
});

export const alignAt = createResponsiveVariants({
  styles: clusterAlignStyles,
  media: defaultMedia,
});
