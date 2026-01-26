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

export const switcherVars = createThemeContract({
  spacing: {
    gap: null,
  },
  layout: {
    threshold: null,
  },
});

const switcherSpacingDefaults = assignVars(switcherVars.spacing, {
  gap: sys.spacing[0],
});

const switcherLayoutDefaults = assignVars(switcherVars.layout, {
  threshold: sys.layout.measure,
});

// Shared variant styles to support responsive overrides
export const switcherSpacingStyles = mapContractVars(sys.spacing, (key) => ({
  '@layer': {
    [components]: {
      vars: {
        ...assignVars(switcherVars.spacing, {
          gap: sys.spacing[key],
        }),
      },
    },
  },
}));

export const switcherLimitStyles = {
  2: {
    '@layer': {
      [components]: {},
    },
  },
  3: {
    '@layer': {
      [components]: {},
    },
  },
  4: {
    '@layer': {
      [components]: {},
    },
  },
  5: {
    '@layer': {
      [components]: {},
    },
  },
  6: {
    '@layer': {
      [components]: {},
    },
  },
} as const;

export const switcherRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: switcherVars.spacing.gap,

        vars: {
          ...switcherSpacingDefaults,
          ...switcherLayoutDefaults,
        },
      },
    },
  },

  variants: {
    /**
     * The space (margin) between the child elements
     */
    spacing: switcherSpacingStyles,

    /**
     * The maximum number of elements allowed to appear in the horizontal configuration
     */
    limit: switcherLimitStyles,
  },
});

const limitValues = [2, 3, 4, 5, 6] as const;

const limitSelector = (limitClass: string, limit: number) =>
  `${limitClass} > :nth-last-child(n+${limit + 1}), ${limitClass} > :nth-last-child(n+${limit + 1}) ~ *`;

globalStyle(`${switcherRecipe.classNames.base} > *`, {
  '@layer': {
    [components]: {
      flexBasis: `calc((${switcherVars.layout.threshold} - 100%) * 999)`,
      flexGrow: 1,
    },
  },
});

limitValues.forEach((limit) => {
  const limitClass = switcherRecipe.classNames.variants.limit[limit];

  globalStyle(limitSelector(limitClass, limit), {
    '@layer': {
      [components]: {
        flexBasis: '100%',
      },
    },
  });
});

export type SwitcherVariants = NonNullable<
  RecipeVariants<typeof switcherRecipe>
>;

export const spacingAt = createResponsiveVariants({
  styles: switcherSpacingStyles,
  media: defaultMedia,
});

export const limitAt = createResponsiveVariants({
  styles: switcherLimitStyles,
  media: defaultMedia,
});

Object.entries(limitAt).forEach(([breakpoint, styles]) => {
  const query = defaultMedia[breakpoint as keyof typeof defaultMedia];

  if (!query) {
    return;
  }

  const styleMap = styles as Record<number, string>;

  limitValues.forEach((limit) => {
    const limitClass = styleMap[limit];

    if (!limitClass) {
      return;
    }

    globalStyle(limitSelector(limitClass, limit), {
      '@media': {
        [query]: {
          '@layer': {
            [components]: {
              flexBasis: '100%',
            },
          },
        },
      },
    });
  });
});
