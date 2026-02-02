import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { createToneStyles } from '../../styles';
import { components } from '../../styles/layers.css';
import { toneTokens } from '../../styles/tone';
import {
  layoutRecipe,
  layoutSpacingStyles,
  layoutElevationStyles,
  layoutRadiusStyles,
} from '../layout/layout.css';

export const boxVars = createThemeContract({
  color: {
    background: null,
    foreground: null,
    outline: null,
  },
});

const boxToneVars = createThemeContract({
  base: null,
  onBase: null,
});

const boxColorDefaults = assignVars(boxVars.color, {
  background: 'transparent',
  foreground: 'inherit',
  outline: 'transparent',
});

const boxToneStyles = createToneStyles(boxToneVars);

const boxVariantStyles = {
  solid: {},
  outline: {},
  bare: {},
} as const;

const boxToneCompoundVariants = (
  Object.keys(toneTokens) as (keyof typeof toneTokens)[]
).flatMap((tone) => [
  {
    variants: { variant: 'solid' as const, tone },
    style: {
      '@layer': {
        [components]: {
          vars: {
            [boxVars.color.background]: boxToneVars.base,
            [boxVars.color.foreground]: boxToneVars.onBase,
            [boxVars.color.outline]: 'transparent',
          },
        },
      },
    },
  },
  {
    variants: { variant: 'outline' as const, tone },
    style: {
      '@layer': {
        [components]: {
          vars: {
            [boxVars.color.background]: 'transparent',
            [boxVars.color.foreground]: boxToneVars.base,
            [boxVars.color.outline]: boxToneVars.base,
          },
        },
      },
    },
  },
  {
    variants: { variant: 'bare' as const, tone },
    style: {
      '@layer': {
        [components]: {
          vars: {
            [boxVars.color.background]: 'transparent',
            [boxVars.color.foreground]: boxToneVars.base,
            [boxVars.color.outline]: 'transparent',
          },
        },
      },
    },
  },
]);

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
              content: '""',
              position: 'absolute',
              inset: 0,
              border: '1px solid',
              borderColor: boxVars.color.outline,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              boxSizing: 'border-box',
            },
          },
        },
      },
    },
  ],

  variants: {
    variant: boxVariantStyles,
    tone: boxToneStyles,
    spacing: layoutSpacingStyles,
    elevation: layoutElevationStyles,
    radius: layoutRadiusStyles,
  },

  defaultVariants: {
    variant: 'solid',
  },

  compoundVariants: boxToneCompoundVariants,
});

export type BoxVariants = NonNullable<RecipeVariants<typeof boxRecipe>>;
