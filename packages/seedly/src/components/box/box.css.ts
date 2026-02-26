import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { resolveColorProfileValues } from '../../styles';
import { components } from '../../styles/layers.css';
import {
  layoutRecipe,
  layoutSpacingStyles,
  layoutElevationStyles,
  layoutRadiusStyles,
} from '../layout/layout.css';

import type {
  StaticColorKey,
  StaticColorSource,
  StaticColorValues,
  StaticColorVariant,
} from '../../styles';

export const boxVars = createThemeContract({
  color: {
    background: null,
    foreground: null,
    border: null,
  },
});

const boxColorDefaults = assignVars(boxVars.color, {
  background: 'transparent',
  foreground: 'inherit',
  border: 'transparent',
});

const boxVariants = {
  solid: {},
  outline: {},
  bare: {},
} as const satisfies Record<StaticColorVariant, Record<string, never>>;

const boxColorSources = [
  'none',
  'tone',
  'container',
  'surface',
] as const satisfies readonly ('none' | StaticColorSource)[];

const toneColorKeys = [
  'neutral',
  'primary',
  'secondary',
  'tertiary',
  'error',
] as const;

const containerColorKeys = ['low', 'base', 'high', 'top'] as const;
const surfaceColorKeys = ['dim', 'base', 'bright'] as const;

const boxColorKeys = [
  ...toneColorKeys,
  ...containerColorKeys,
  ...surfaceColorKeys,
] as const satisfies readonly StaticColorKey[];

const emptyColorSourceStyles = boxColorSources.reduce(
  (styles, colorSource) => ({
    ...styles,
    [colorSource]: {},
  }),
  {} as Record<'none' | StaticColorSource, Record<string, never>>,
);

const emptyColorKeyStyles = boxColorKeys.reduce(
  (styles, colorKey) => ({
    ...styles,
    [colorKey]: {},
  }),
  {} as Record<StaticColorKey, Record<string, never>>,
);

const assignBoxColorVars = (values: StaticColorValues) => {
  return assignVars(boxVars.color, {
    foreground: values.foreground,
    background: values.background,
    border: values.border,
  });
};

const toneCompoundVariants = toneColorKeys.flatMap((colorKey) => {
  return (Object.keys(boxVariants) as StaticColorVariant[]).map((variant) => {
    return {
      variants: {
        colorSource: 'tone' as const,
        colorKey,
        variant,
      },
      style: {
        '@layer': {
          [components]: {
            vars: {
              ...assignBoxColorVars(
                resolveColorProfileValues({
                  profile: 'static',
                  colorSource: 'tone',
                  colorKey,
                  variant,
                }),
              ),
            },
          },
        },
      },
    };
  });
});

const containerCompoundVariants = containerColorKeys.flatMap((colorKey) => {
  return (Object.keys(boxVariants) as StaticColorVariant[]).map((variant) => {
    return {
      variants: {
        colorSource: 'container' as const,
        colorKey,
        variant,
      },
      style: {
        '@layer': {
          [components]: {
            vars: {
              ...assignBoxColorVars(
                resolveColorProfileValues({
                  profile: 'static',
                  colorSource: 'container',
                  colorKey,
                  variant,
                }),
              ),
            },
          },
        },
      },
    };
  });
});

const surfaceCompoundVariants = surfaceColorKeys.flatMap((colorKey) => {
  return (Object.keys(boxVariants) as StaticColorVariant[]).map((variant) => {
    return {
      variants: {
        colorSource: 'surface' as const,
        colorKey,
        variant,
      },
      style: {
        '@layer': {
          [components]: {
            vars: {
              ...assignBoxColorVars(
                resolveColorProfileValues({
                  profile: 'static',
                  colorSource: 'surface',
                  colorKey,
                  variant,
                }),
              ),
            },
          },
        },
      },
    };
  });
});

export const boxRecipe = recipe({
  base: [
    layoutRecipe.classNames.base,
    {
      '@layer': {
        [components]: {
          color: boxVars.color.foreground,
          backgroundColor: boxVars.color.background,

          vars: {
            ...boxColorDefaults,
          },

          selectors: {
            '&::before': {
              inset: 0,
              position: 'absolute',
              border: '1px solid',
              borderColor: boxVars.color.border,
              borderRadius: 'inherit',
              content: '""',
              pointerEvents: 'none',
            },
          },
        },
      },
    },
  ],

  variants: {
    variant: boxVariants,
    colorSource: emptyColorSourceStyles,
    colorKey: emptyColorKeyStyles,
    spacing: layoutSpacingStyles,
    elevation: layoutElevationStyles,
    radius: layoutRadiusStyles,
  },

  defaultVariants: {
    variant: 'solid',
    colorSource: 'none',
    colorKey: 'base',
  },

  compoundVariants: [
    ...toneCompoundVariants,
    ...containerCompoundVariants,
    ...surfaceCompoundVariants,
  ],
});

export type BoxVariants = NonNullable<RecipeVariants<typeof boxRecipe>>;
