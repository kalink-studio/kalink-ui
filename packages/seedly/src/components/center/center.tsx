import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { ElementType } from 'react';

import { CenterVariants } from './center.css';
import { centerResponsive } from './center.responsive';

import type { Responsive } from '../../styles/responsive';

export type CenterProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> &
    Omit<CenterVariants, 'gutters' | 'andText' | 'intrinsic'> & {
      andText?: Responsive<NonNullable<CenterVariants['andText']>>;
      gutters?: Responsive<NonNullable<CenterVariants['gutters']>>;
      intrinsic?: Responsive<NonNullable<CenterVariants['intrinsic']>>;
    };

/**
 * A custom element for centering a block-level element horizontally,
 * with a max-width value representing the typographic measure.
 *
 * https://every-layout.dev/layouts/center
 */
export function Center<TUse extends ElementType>({
  andText,
  gutters,
  intrinsic,
  className,
  ...props
}: CenterProps<TUse>) {
  const { use: Comp = 'div', ...rest } = props;

  return (
    <Comp
      className={centerResponsive({ andText, gutters, intrinsic }, className)}
      {...rest}
    />
  );
}
