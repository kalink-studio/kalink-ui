import { globalStyle } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys, typography } from '../../styles';
import { components } from '../../styles/layers.css';

export const commandGroupRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexDirection: 'column',
        gap: sys.spacing[2],

        selectors: {
          '&[hidden]': {
            display: 'none',

            position: 'absolute',
          },
        },
      },
    },
  },

  variants: {
    size: {
      sm: typography.label.small,
      md: typography.label.medium,
      lg: typography.label.large,
    },
  },

  defaultVariants: {
    size: 'sm',
  },
});

globalStyle(`${commandGroupRecipe.classNames.base} [cmdk-group-heading]`, {
  '@layer': {
    [components]: {
      position: 'relative',

      color: `color-mix(in srgb, ${sys.surface.foreground} calc(${sys.state.muted.text} * 100%), transparent)`,

      cursor: 'default',
      userSelect: 'none',
    },
  },
});

export type CommandGroupVariants = NonNullable<
  RecipeVariants<typeof commandGroupRecipe>
>;
