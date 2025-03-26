import { createThemeContract } from '@vanilla-extract/css';
import { ArrayValues } from 'type-fest';

export const typeContract = {
  font: null,
  weight: null,
  lineHeight: null,
  tracking: null,
  size: null,
} as const;

const typographyVariants = [
  'display',
  'headline',
  'title',
  'label',
  'body',
] as const;

const typographySizes = ['large', 'medium', 'small'] as const;

export const sys = createThemeContract({
  layout: {
    direction: null,
    measure: null,
  },

  color: {
    background: null,
    foreground: null,
  },

  state: {
    hovered: {
      opacity: null,
    },
    focused: {
      opacity: null,
    },
    pressed: {
      opacity: null,
    },
    muted: {
      light: null,
      dark: null,
    },
  },

  shape: {
    corner: {
      none: null,
      sharp: null,
      small: null,
      medium: null,
      rounded: null,
      circle: null,
    },
  },

  elevation: {
    none: null,
    minimal: null,
    low: null,
    moderate: null,
    high: null,
    peak: null,
  },

  motion: {
    duration: {
      short: {
        1: null,
        2: null,
        3: null,
        4: null,
      },
      medium: {
        1: null,
        2: null,
        3: null,
        4: null,
      },
      long: {
        1: null,
        2: null,
        3: null,
        4: null,
      },
    },

    easing: {
      standard: null,
      decelerate: {
        standard: null,
        emphasized: null,
      },
      accelerate: {
        standard: null,
        emphasized: null,
      },
    },
  },

  typography: typographyVariants.reduce(
    (acc, variant) => ({
      ...acc,
      [variant]: typographySizes.reduce(
        (acc, size) => ({
          ...acc,
          [size]: typeContract,
        }),
        {} as Record<TypographySize, typeof typeContract>,
      ),
    }),
    {} as Record<
      TypographyVariant,
      Record<TypographySize, typeof typeContract>
    >,
  ),

  spacing: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
    13: null,
    14: null,
    15: null,
    16: null,
    17: null,
    18: null,
  },
});

export type Spacing = keyof typeof sys.spacing;
export type TypographyVariant = ArrayValues<typeof typographyVariants>;
export type TypographySize = ArrayValues<typeof typographySizes>;

export type Duration = {
  [K in keyof typeof sys.motion.duration]: `${K}.${Extract<keyof (typeof sys.motion.duration)[K], string | number>}`;
}[keyof typeof sys.motion.duration];

export type Easing = {
  [K in keyof typeof sys.motion.easing]: (typeof sys.motion.easing)[K] extends string
    ? K
    : `${K}.${Extract<keyof (typeof sys.motion.easing)[K], string | number>}`;
}[keyof typeof sys.motion.easing];
