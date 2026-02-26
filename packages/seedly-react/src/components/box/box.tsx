import { useRender } from '@base-ui/react/use-render';
import {
  boxResponsive,
  type BoxVariants,
} from '@kalink-ui/seedly/components/box';

import { mergeClassName } from '@/utils/merge-class-name';

import type {
  ColorTone,
  ContainerLevel,
  SurfaceLevel,
} from '@kalink-ui/seedly/styles';

interface BoxLayoutOnlyProps {
  colorSource?: undefined;
  variant?: never;
  colorKey?: never;
}

interface BoxToneProps {
  colorSource: 'tone';
  colorKey: ColorTone;
  variant?: BoxVariants['variant'];
}

interface BoxContainerProps {
  colorSource: 'container';
  colorKey: ContainerLevel;
  variant?: BoxVariants['variant'];
}

interface BoxSurfaceProps {
  colorSource: 'surface';
  colorKey: SurfaceLevel;
  variant?: BoxVariants['variant'];
}

export type BoxLayoutProps = useRender.ComponentProps<'div'> &
  Omit<BoxVariants, 'spacing' | 'variant' | 'colorSource' | 'colorKey'> & {
    spacing?: NonNullable<BoxVariants['spacing']>;
  };

export type BoxProps = BoxLayoutProps &
  (BoxLayoutOnlyProps | BoxToneProps | BoxContainerProps | BoxSurfaceProps);

export function Box({
  spacing,
  radius,
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
      radius,
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
