import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import {
  createResponsiveVariants,
  defaultMedia,
  resolveColorProfileValues,
  sys,
} from '../../styles';
import { atoms } from '../../styles/layers.css';
import {
  createLayoutBaseStyles,
  createLayoutCornerStyles,
  createLayoutElevationStyles,
  createLayoutSpacingStyles,
} from '../_foundation';
import { layoutVars } from '../layout/layout.css';

import type {
  StaticColorArgs,
  StaticColorKey,
  StaticColorSource,
  StaticColorValues,
  StaticColorVariant,
} from '../../styles';

const boxVars = createThemeContract({
  color: {
    rootBackground: null,
    rootBorder: null,
    rootForeground: null,
  },
});

const boxDefaults = assignVars(boxVars, {
  color: {
    rootBackground: 'transparent',
    rootBorder: 'transparent',
    rootForeground: 'inherit',
  },
});

const boxVariants = {
  solid: {},
  outline: {},
  bare: {},
} as const satisfies Record<StaticColorVariant, Record<string, never>>;

const boxVariantKeys = Object.keys(boxVariants) as StaticColorVariant[];

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

interface BoxColorKeyBySource {
  tone: (typeof toneColorKeys)[number];
  container: (typeof containerColorKeys)[number];
  surface: (typeof surfaceColorKeys)[number];
}

const boxColorKeysBySource = {
  tone: toneColorKeys,
  container: containerColorKeys,
  surface: surfaceColorKeys,
} as const satisfies {
  [K in keyof BoxColorKeyBySource]: readonly BoxColorKeyBySource[K][];
};

const boxColorKeys = [
  ...boxColorKeysBySource.tone,
  ...boxColorKeysBySource.container,
  ...boxColorKeysBySource.surface,
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

const boxLayoutBase = style(
  createLayoutBaseStyles({
    layer: atoms,
    vars: layoutVars,
    defaultValues: {
      elevation: {
        rootLevel: sys.elevation.none,
      },
      shape: {
        rootCorner: sys.shape.corner.none,
      },
      spacing: {
        rootPaddingBlock: sys.spacing[0],
        rootPaddingInline: sys.spacing[0],
      },
    },
  }),
);

const boxLayoutSpacingStyles = createLayoutSpacingStyles({
  layer: atoms,
  scale: sys.spacing,
  vars: layoutVars.spacing,
});

const boxLayoutElevationStyles = createLayoutElevationStyles({
  layer: atoms,
  scale: sys.elevation,
  vars: layoutVars.elevation,
});

const boxLayoutCornerStyles = createLayoutCornerStyles({
  layer: atoms,
  scale: sys.shape.corner,
  vars: layoutVars.shape,
});

export const boxCornerAt = createResponsiveVariants({
  styles: boxLayoutCornerStyles,
  media: defaultMedia,
});

const assignBoxColorVars = (values: StaticColorValues) => {
  return assignVars(boxVars, {
    color: {
      rootBackground: values.background,
      rootBorder: values.border,
      rootForeground: values.foreground,
    },
  });
};

const createColorCompoundVariants = <TColorSource extends StaticColorSource>(
  colorSource: TColorSource,
  colorKeys: readonly BoxColorKeyBySource[TColorSource][],
) => {
  return colorKeys.flatMap((colorKey) => {
    return boxVariantKeys.map((variant) => {
      const colorProfileArgs = {
        profile: 'static',
        colorSource,
        colorKey,
        variant,
      } as Extract<StaticColorArgs, { colorSource: TColorSource }>;

      return {
        variants: {
          colorSource,
          colorKey,
          variant,
        },
        style: {
          '@layer': {
            [atoms]: {
              vars: {
                ...assignBoxColorVars(
                  resolveColorProfileValues(colorProfileArgs),
                ),
              },
            },
          },
        },
      };
    });
  });
};

export const boxRecipe = recipe({
  base: [
    boxLayoutBase,
    {
      '@layer': {
        [atoms]: {
          vars: {
            ...boxDefaults,
          },

          backgroundColor: boxVars.color.rootBackground,
          color: boxVars.color.rootForeground,

          selectors: {
            '&::before': {
              border: '1px solid',
              borderColor: boxVars.color.rootBorder,
              borderRadius: 'inherit',
              content: '""',
              inset: 0,
              pointerEvents: 'none',
              position: 'absolute',
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
    spacing: boxLayoutSpacingStyles,
    elevation: boxLayoutElevationStyles,
    corner: boxLayoutCornerStyles,
  },

  defaultVariants: {
    variant: 'solid',
    colorSource: 'none',
    colorKey: 'base',
  },

  compoundVariants: [
    ...createColorCompoundVariants('tone', boxColorKeysBySource.tone),
    ...createColorCompoundVariants('container', boxColorKeysBySource.container),
    ...createColorCompoundVariants('surface', boxColorKeysBySource.surface),
  ],
});

export type BoxVariants = NonNullable<RecipeVariants<typeof boxRecipe>>;
