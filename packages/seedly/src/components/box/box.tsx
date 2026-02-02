import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { ElementType } from 'react';

import { BoxVariants } from './box.css';
import { boxResponsive } from './box.responsive';

import type { Responsive } from '../../styles/responsive';

interface BoxLayoutOnlyProps {
  tone?: undefined;
  variant?: never;
}

interface BoxToneProps {
  tone: NonNullable<BoxVariants['tone']>;
  variant?: BoxVariants['variant'];
}

export type BoxLayoutProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> &
    Omit<BoxVariants, 'spacing' | 'tone' | 'variant'> & {
      spacing?: Responsive<NonNullable<BoxVariants['spacing']>>;
    };

export type BoxProps<TUse extends ElementType> = BoxLayoutProps<TUse> &
  (BoxLayoutOnlyProps | BoxToneProps);

/**
 * A evenly spaced container for grouping related elements. Can
 * be styled with colors, borders, and shadows.
 *
 * https://every-layout.dev/layouts/box
 */
export function Box<TUse extends ElementType = 'div'>({
  spacing,
  radius,
  elevation,
  tone,
  className,
  variant,
  ...props
}: BoxProps<TUse>) {
  const { use: Comp = 'div', ...rest } = props;

  return (
    <Comp
      className={boxResponsive(
        { variant, spacing, radius, elevation, tone },
        className,
      )}
      {...rest}
    />
  );
}
