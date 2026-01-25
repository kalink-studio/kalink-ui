import { createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import {
  createResponsiveVariants,
  defaultMedia,
  mapContractVars,
  sys,
} from '../../styles';
import { components } from '../../styles/layers.css';

const spaceVar = createVar();

// Shared spacing styles for responsive overrides
export const menuSeparatorSpacingStyles = mapContractVars(
  sys.spacing,
  (key) => ({
    '@layer': {
      [components]: {
        vars: {
          [spaceVar]: sys.spacing[key],
        },
      },
    },
  }),
);

export const menuSeparator = recipe({
  base: {
    paddingBlock: spaceVar,
    marginInline: sys.spacing[2],

    position: 'relative',

    '::after': {
      content: '""',

      height: '1px',
      width: '100%',

      position: 'absolute',
      top: '50%',

      backgroundColor: sys.surface.foreground,

      transform: 'translateY(-50%)',
    },
  },

  variants: {
    offset: {
      true: {
        marginInline: calc.negate(sys.spacing[2]),
        marginBlock: calc.negate(sys.spacing[2]),
      },
    },

    spacing: menuSeparatorSpacingStyles,
  },
});

export type MenuSeparatorVariants = NonNullable<
  RecipeVariants<typeof menuSeparator>
>;

export const spacingAt = createResponsiveVariants({
  styles: menuSeparatorSpacingStyles,
  media: defaultMedia,
});
