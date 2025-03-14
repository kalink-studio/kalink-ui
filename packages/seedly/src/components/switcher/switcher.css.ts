import { createVar, globalStyle } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { components } from '../../styles/layers.css';
import { sys } from '../../styles/system-contract.css';
import { mapContractVars } from '../../utils/map-contract-vars';

export const thresholdVar = createVar();
export const limitVar = createVar();

export const switcherRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexWrap: 'wrap',

        vars: {
          [thresholdVar]: sys.layout.measure,
        },
      },
    },
  },

  variants: {
    /**
     * The space (margin) between the child elements
     */
    spacing: mapContractVars(sys.spacing, (key) => ({
      '@layer': {
        [components]: {
          gap: sys.spacing[key],
        },
      },
    })),

    /**
     * The maximum number of elements allowed to appear in the horizontal configuration
     */
    limit: {
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
    },
  },
});

globalStyle(`${switcherRecipe.classNames.base} > *`, {
  '@layer': {
    [components]: {
      flexBasis: `calc((${thresholdVar} - 100%) * 999)`,
      flexGrow: 1,
    },
  },
});

globalStyle(
  `${switcherRecipe.classNames.variants.limit[2]} > :nth-last-child(n+3), ${
    switcherRecipe.classNames.variants.limit[2]
  } > :nth-last-child(n+3) ~ *`,
  {
    '@layer': {
      [components]: {
        flexBasis: '100%',
      },
    },
  },
);

globalStyle(
  `${switcherRecipe.classNames.variants.limit[3]} > :nth-last-child(n+4), ${
    switcherRecipe.classNames.variants.limit[3]
  } > :nth-last-child(n+4) ~ *`,
  {
    '@layer': {
      [components]: {
        flexBasis: '100%',
      },
    },
  },
);

globalStyle(
  `${switcherRecipe.classNames.variants.limit[4]} > :nth-last-child(n+5), ${
    switcherRecipe.classNames.variants.limit[4]
  } > :nth-last-child(n+5) ~ *`,
  {
    '@layer': {
      [components]: {
        flexBasis: '100%',
      },
    },
  },
);

globalStyle(
  `${switcherRecipe.classNames.variants.limit[5]} > :nth-last-child(n+6), ${
    switcherRecipe.classNames.variants.limit[5]
  } > :nth-last-child(n+6) ~ *`,
  {
    '@layer': {
      [components]: {
        flexBasis: '100%',
      },
    },
  },
);

globalStyle(
  `${switcherRecipe.classNames.variants.limit[6]} > :nth-last-child(n+7), ${
    switcherRecipe.classNames.variants.limit[6]
  } > :nth-last-child(n+7) ~ *`,
  {
    '@layer': {
      [components]: {
        flexBasis: '100%',
      },
    },
  },
);

export type SwitcherVariants = NonNullable<
  RecipeVariants<typeof switcherRecipe>
>;
