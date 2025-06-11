import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const commandItem = recipe({
  base: {
    '@layer': {
      [components]: {
        cursor: 'pointer',

        color: sys.color.foreground,

        selectors: {
          '&[data-selected=true]': {
            backgroundColor: `color-mix(in srgb, ${sys.color.foreground} calc(${sys.state.muted.dark} * 100%), transparent)`,
            outline: 'none',
          },

          '&:active': {
            backgroundColor: `color-mix(in srgb, ${sys.color.foreground} calc(${sys.state.focused} * 100%), transparent)`,
            outline: 'none',
          },
        },
      },
    },
  },
});

export type CommandItemVariants = NonNullable<
  RecipeVariants<typeof commandItem>
>;
