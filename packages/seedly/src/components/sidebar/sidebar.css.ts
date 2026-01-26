import {
  assignVars,
  createThemeContract,
  globalStyle,
} from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import {
  createResponsiveVariants,
  defaultMedia,
  mapContractVars,
  sys,
} from '../../styles';
import { components } from '../../styles/layers.css';

export const sidebarVars = createThemeContract({
  spacing: {
    gap: null,
  },
  layout: {
    sideWidth: null,
    contentMinWidth: null,
  },
});

const sidebarSpacingDefaults = assignVars(sidebarVars.spacing, {
  gap: sys.spacing[0],
});

const sidebarLayoutDefaults = assignVars(sidebarVars.layout, {
  sideWidth: 'auto',
  contentMinWidth: '50%',
});

// Shared variant styles to support responsive overrides
export const sidebarSpacingStyles = mapContractVars(sys.spacing, (key) => ({
  '@layer': {
    [components]: {
      vars: {
        ...assignVars(sidebarVars.spacing, {
          gap: sys.spacing[key],
        }),
      },
    },
  },
}));

export const sidebarRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: sidebarVars.spacing.gap,

        vars: {
          ...sidebarSpacingDefaults,
          ...sidebarLayoutDefaults,
        },
      },
    },
  },

  variants: {
    /**
     * The spacing between the sidebar and main content elements
     */
    spacing: sidebarSpacingStyles,

    /**
     * Whether the sidebar should stretch to fill the available space
     */
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
      flexBasis: sidebarVars.layout.sideWidth,
    },
  },
});

globalStyle(`${sidebarRecipe.classNames.variants.side.left} > :last-child`, {
  '@layer': {
    [components]: {
      flexBasis: 0,
      flexGrow: 999,
      minInlineSize: sidebarVars.layout.contentMinWidth,
    },
  },
});

globalStyle(`${sidebarRecipe.classNames.variants.side.right} > :first-child`, {
  '@layer': {
    [components]: {
      flexBasis: 0,
      flexGrow: 999,
      minInlineSize: sidebarVars.layout.contentMinWidth,
    },
  },
});

export type SidebarVariants = NonNullable<RecipeVariants<typeof sidebarRecipe>>;

export const spacingAt = createResponsiveVariants({
  styles: sidebarSpacingStyles,
  media: defaultMedia,
});
