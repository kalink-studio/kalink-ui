import { useRender } from '@base-ui/react/use-render';
import {
  boxResponsive,
  type BoxVariants,
} from '@kalink-ui/seedly/components/box';

import { mergeClassName } from '@/utils/merge-class-name';

import type { Responsive } from '@kalink-ui/seedly/styles';

interface BoxLayoutOnlyProps {
  tone?: undefined;
  variant?: never;
}

interface BoxToneProps {
  tone: NonNullable<BoxVariants['tone']>;
  variant?: BoxVariants['variant'];
}

export type BoxLayoutProps = useRender.ComponentProps<'div'> &
  Omit<BoxVariants, 'spacing' | 'tone' | 'variant'> & {
    spacing?: Responsive<NonNullable<BoxVariants['spacing']>>;
  };

export type BoxProps = BoxLayoutProps & (BoxLayoutOnlyProps | BoxToneProps);

export function Box({
  spacing,
  radius,
  elevation,
  tone,
  className,
  variant,
  render,
  ...props
}: BoxProps) {
  const mergedClassName = mergeClassName(
    boxResponsive({ variant, spacing, radius, elevation, tone }),
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
