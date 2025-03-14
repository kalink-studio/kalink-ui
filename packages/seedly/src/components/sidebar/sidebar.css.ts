import { createVar, globalStyle } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { components } from '../../styles/layers.css';
import { sys } from '../../styles/system-contract.css';
import { mapContractVars } from '../../utils/map-contract-vars';

export const sideWidthVar = createVar();
export const contentMinWidthVar = createVar();

export const sidebarRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexWrap: 'wrap',

        vars: {
          [contentMinWidthVar]: '50%',
        },
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

    noStretch: {
      true: {
        '@layer': {
          [components]: {
            alignItems: 'flex-start',
          },
        },
      },
    },

    /**
     * The width of the sidebar (empty means not set; defaults to the content width)
     */
    sideWidth: {
      true: {},
    },

    /**
     * Whether the sided element is the :last-child
     */
    side: {
      right: {},
      left: {},
    },
  },
});

globalStyle(`${sidebarRecipe.classNames.base} > *`, {
  '@layer': {
    [components]: {
      flexGrow: 1,
    },
  },
});

globalStyle(`${sidebarRecipe.classNames.variants.sideWidth.true} > *`, {
  '@layer': {
    [components]: {
      flexBasis: sideWidthVar,
    },
  },
});

globalStyle(`${sidebarRecipe.classNames.variants.side.left} > :last-child`, {
  '@layer': {
    [components]: {
      flexBasis: 0,
      flexGrow: 999,
      minInlineSize: contentMinWidthVar,
    },
  },
});

globalStyle(`${sidebarRecipe.classNames.variants.side.right} > :first-child`, {
  '@layer': {
    [components]: {
      flexBasis: 0,
      flexGrow: 999,
      minInlineSize: contentMinWidthVar,
    },
  },
});

export type SidebarVariants = NonNullable<RecipeVariants<typeof sidebarRecipe>>;
