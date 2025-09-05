import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { CenterVariants } from './center.css';
import { centerResponsive } from './center.responsive';

import type { Responsive } from '../../styles/responsive';

export type CenterProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> &
    Omit<CenterVariants, 'gutters'> & {
      gutters?: Responsive<NonNullable<CenterVariants['gutters']>>;
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
      className={clsx(
        centerResponsive({ andText, gutters, intrinsic }),
        className,
      )}
      {...rest}
    />
  );
}
