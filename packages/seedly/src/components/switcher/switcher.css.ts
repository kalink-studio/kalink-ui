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
import { layouts } from '../../styles/layers.css';

export const switcherVars = createThemeContract({
  layout: {
    rootThreshold: null,
  },
  spacing: {
    rootGap: null,
  },
});

const switcherDefaults = assignVars(switcherVars, {
  layout: {
    rootThreshold: sys.layout.measure,
  },
  spacing: {
    rootGap: sys.spacing[0],
  },
});

export const switcherSpacingStyles = mapContractVars(
  sys.spacing,
  switcherVars.spacing,
  layouts,
);

export const switcherLimitStyles = {
  2: {
    '@layer': {
      [layouts]: {},
    },
  },
  3: {
    '@layer': {
      [layouts]: {},
    },
  },
  4: {
    '@layer': {
      [layouts]: {},
    },
  },
  5: {
    '@layer': {
      [layouts]: {},
    },
  },
  6: {
    '@layer': {
      [layouts]: {},
    },
  },
} as const;

export const switcherRecipe = recipe({
  base: {
    '@layer': {
      [layouts]: {
        vars: switcherDefaults,

        display: 'flex',
        flexWrap: 'wrap',
        gap: switcherVars.spacing.rootGap,
      },
    },
  },

  variants: {
    spacing: switcherSpacingStyles,
    limit: switcherLimitStyles,
  },
});

const limitValues = [2, 3, 4, 5, 6] as const;

const limitSelector = (limitClass: string, limit: number) => {
  return `${limitClass} > :nth-last-child(n+${limit + 1}), ${limitClass} > :nth-last-child(n+${limit + 1}) ~ *`;
};

globalStyle(`${switcherRecipe.classNames.base} > *`, {
  '@layer': {
    [layouts]: {
      flexBasis: `calc((${switcherVars.layout.rootThreshold} - 100%) * 999)`,
      flexGrow: 1,
    },
  },
});

limitValues.forEach((limit) => {
  const limitClass = switcherRecipe.classNames.variants.limit[limit];

  globalStyle(limitSelector(limitClass, limit), {
    '@layer': {
      [layouts]: {
        flexBasis: '100%',
      },
    },
  });
});

export type SwitcherVariants = NonNullable<
  RecipeVariants<typeof switcherRecipe>
>;

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
            [layouts]: {
              flexBasis: '100%',
            },
          },
        },
      },
    });
  });
});
