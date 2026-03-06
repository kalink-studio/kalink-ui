import { type StyleRule } from '@vanilla-extract/css';

export interface LayoutVarsContract {
  elevation: {
    rootLevel: string;
  };
  shape: {
    rootCorner: string;
  };
  spacing: {
    rootPaddingBlock: string;
    rootPaddingInline: string;
  };
}

export interface LayoutDefaultValues {
  elevation: {
    rootLevel: string;
  };
  shape: {
    rootCorner: string;
  };
  spacing: {
    rootPaddingBlock: string;
    rootPaddingInline: string;
  };
}

interface LayoutBaseStylesOptions {
  layer: string;
  vars: LayoutVarsContract;
  defaultValues: LayoutDefaultValues;
}

interface LayeredScaleStylesOptions<
  TScale extends Record<string, string>,
  TVars extends Record<string, string>,
> {
  layer: string;
  scale: TScale;
  vars: TVars;
}

const createVarAssignments = <TVars extends Record<string, string>>(
  vars: TVars,
  value: string,
) => {
  return Object.fromEntries(
    Object.values(vars).map((varName) => [varName, value]),
  ) as Record<string, string>;
};

const createLayeredScaleStyles = <
  TScale extends Record<string, string>,
  TVars extends Record<string, string>,
>({
  layer,
  scale,
  vars,
}: LayeredScaleStylesOptions<TScale, TVars>) => {
  const styles = {} as Record<keyof TScale, StyleRule>;

  for (const scaleKey of Object.keys(scale) as (keyof TScale)[]) {
    const value = scale[scaleKey];

    if (value == null) {
      continue;
    }

    styles[scaleKey] = {
      '@layer': {
        [layer]: {
          vars: createVarAssignments(vars, value),
        },
      },
    };
  }

  return styles;
};

export const createLayoutBaseStyles = ({
  layer,
  vars,
  defaultValues,
}: LayoutBaseStylesOptions): StyleRule => {
  return {
    '@layer': {
      [layer]: {
        vars: {
          [vars.elevation.rootLevel]: defaultValues.elevation.rootLevel,
          [vars.shape.rootCorner]: defaultValues.shape.rootCorner,
          [vars.spacing.rootPaddingBlock]:
            defaultValues.spacing.rootPaddingBlock,
          [vars.spacing.rootPaddingInline]:
            defaultValues.spacing.rootPaddingInline,
        },

        position: 'relative',

        paddingBlock: vars.spacing.rootPaddingBlock,
        paddingInline: vars.spacing.rootPaddingInline,

        borderRadius: vars.shape.rootCorner,
        boxShadow: vars.elevation.rootLevel,
      },
    },
  };
};

export const createLayoutSpacingStyles = <
  TScale extends Record<string, string>,
>({
  layer,
  scale,
  vars,
}: LayeredScaleStylesOptions<TScale, LayoutVarsContract['spacing']>) => {
  return createLayeredScaleStyles({ layer, scale, vars });
};

export const createLayoutElevationStyles = <
  TScale extends Record<string, string>,
>({
  layer,
  scale,
  vars,
}: LayeredScaleStylesOptions<TScale, LayoutVarsContract['elevation']>) => {
  return createLayeredScaleStyles({ layer, scale, vars });
};

export const createLayoutCornerStyles = <
  TScale extends Record<string, string>,
>({
  layer,
  scale,
  vars,
}: LayeredScaleStylesOptions<TScale, LayoutVarsContract['shape']>) => {
  return createLayeredScaleStyles({ layer, scale, vars });
};
