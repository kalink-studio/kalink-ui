import { createVar, globalStyle } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';
import { mapContractVars } from '@/utils/map-contract-vars';

export const sideWidthVar = createVar();
export const contentMinWidthVar = createVar();

export const sidebarRecipe = recipe({
  base: {
    display: 'flex',
    flexWrap: 'wrap',

    vars: {
      [contentMinWidthVar]: '50%',
    },
  },

  variants: {
    spacing: mapContractVars(vars.spacing, (key) => ({
      gap: vars.spacing[key],
    })),

    noStretch: {
      true: {
        alignItems: 'flex-start',
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
  flexGrow: 1,
});

globalStyle(`${sidebarRecipe.classNames.variants.sideWidth.true} > *`, {
  flexBasis: sideWidthVar,
});

globalStyle(`${sidebarRecipe.classNames.variants.side.left} > :last-child`, {
  flexBasis: 0,
  flexGrow: 999,
  minInlineSize: contentMinWidthVar,
});

globalStyle(`${sidebarRecipe.classNames.variants.side.right} > :first-child`, {
  flexBasis: 0,
  flexGrow: 999,
  minInlineSize: contentMinWidthVar,
});

export type SidebarVariants = NonNullable<RecipeVariants<typeof sidebarRecipe>>;
