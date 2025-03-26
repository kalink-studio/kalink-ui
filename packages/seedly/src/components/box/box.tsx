import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { BoxVariants, boxRecipe } from './box.css';

export type BoxProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> & BoxVariants;

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
      className={clsx(
        boxRecipe({ variant, spacing, radius, elevation }),
        className,
      )}
      {...rest}
    />
  );
}
