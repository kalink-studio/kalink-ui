import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { centerRecipe, CenterVariants } from './center.css';

export type CenterProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> & CenterVariants;

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
      className={clsx(centerRecipe({ andText, gutters, intrinsic }), className)}
      {...rest}
    />
  );
}
