import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { ElementType } from 'react';

import { BoxVariants } from './box.css';
import { boxResponsive } from './box.responsive';

import type { Responsive } from '../../styles/responsive';

export type BoxProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> &
    Omit<BoxVariants, 'spacing'> & {
      spacing?: Responsive<NonNullable<BoxVariants['spacing']>>;
    };

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
  className,
  variant,
  ...props
}: BoxProps<TUse>) {
  const { use: Comp = 'div', ...rest } = props;

  return (
    <Comp
      className={boxResponsive(
        { variant, spacing, radius, elevation },
        className,
      )}
      {...rest}
    />
  );
}
