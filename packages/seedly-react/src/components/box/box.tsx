import { useRender } from '@base-ui/react/use-render';
import {
  boxResponsive,
  type BoxVariants,
} from '@kalink-ui/seedly/components/box';

import { mergeClassName } from '../../utils/merge-class-name';

import type {
  ColorTone,
  ContainerLevel,
  SurfaceLevel,
} from '@kalink-ui/seedly/styles';

interface BoxLayoutOnlyProps {
  colorSource?: undefined;
  variant?: never;
  colorKey?: undefined;
}

type BoxColorVariant = NonNullable<BoxVariants['variant']>;

interface BoxToneProps {
  colorSource: 'tone';
  colorKey: ColorTone;
  variant?: BoxColorVariant;
}

interface BoxContainerProps {
  colorSource: 'container';
  colorKey: ContainerLevel;
  variant?: BoxColorVariant;
}

interface BoxSurfaceProps {
  colorSource: 'surface';
  colorKey: SurfaceLevel;
  variant?: BoxColorVariant;
}

type BoxColorProps = BoxToneProps | BoxContainerProps | BoxSurfaceProps;

export type BoxLayoutProps = useRender.ComponentProps<'div'> &
  Omit<BoxVariants, 'spacing' | 'variant' | 'colorSource' | 'colorKey'> & {
    spacing?: NonNullable<BoxVariants['spacing']>;
  };

export type BoxProps = BoxLayoutProps & (BoxLayoutOnlyProps | BoxColorProps);

export function Box({
  spacing,
  corner,
  elevation,
  colorSource,
  colorKey,
  className,
  variant,
  render,
  ...props
}: BoxProps) {
  const mergedClassName = mergeClassName(
    boxResponsive({
      variant,
      colorSource,
      colorKey,
      spacing,
      corner,
      elevation,
    }),
    className,
  );

  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      className: mergedClassName,
    },
  });
}
