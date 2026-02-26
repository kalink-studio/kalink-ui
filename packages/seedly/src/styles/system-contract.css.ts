import { createThemeContract } from '@vanilla-extract/css';
import { type ArrayValues } from 'type-fest';

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

const toneNames = [
  'neutral',
  'primary',
  'secondary',
  'tertiary',
  'error',
] as const;

export type Tone = ArrayValues<typeof toneNames>;
export type ToneOnName = `on${Capitalize<Tone>}`;
export type ToneContainerName = `${Tone}Container`;
export type ToneOnContainerName = `on${Capitalize<Tone>}Container`;
export type ToneKeys =
  | Tone
  | ToneOnName
  | ToneContainerName
  | ToneOnContainerName;
export type ToneContract = Record<ToneKeys, null>;

export const sys = createThemeContract({
  layout: {
    direction: null,
    measure: null,
  },

  color: {
    surface: {
      dim: null,
      base: null,
      bright: null,
    },
    container: {
      low: null,
      base: null,
      high: null,
      top: null,
    },
    content: {
      base: null,
    },
    border: {
      low: null,
      base: null,
      high: null,
    },
    tone: toneNames.reduce(
      (acc, tone) => ({
        ...acc,
        [tone]: null,
        [`on${tone[0]?.toUpperCase()}${tone.slice(1)}`]: null,
        [`${tone}Container`]: null,
        [`on${tone[0]?.toUpperCase()}${tone.slice(1)}Container`]: null,
      }),
      {} as ToneContract,
    ),
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
      text: null,
      surface: null,
    },
    disabled: {
      text: null,
      border: null,
      background: null,
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
        (sizeAcc, size) => ({
          ...sizeAcc,
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
  [K in keyof typeof sys.motion.duration]: `${K}.${Extract<
    keyof (typeof sys.motion.duration)[K],
    string | number
  >}`;
}[keyof typeof sys.motion.duration];

export type Easing = {
  [K in keyof typeof sys.motion.easing]: (typeof sys.motion.easing)[K] extends string
    ? K
    : `${K}.${Extract<keyof (typeof sys.motion.easing)[K], string | number>}`;
}[keyof typeof sys.motion.easing];
