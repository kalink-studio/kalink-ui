import { clsx } from 'clsx';

import type { PolymorphicComponentProps } from '@/types/utils.types.js';

import { boxRecipe, type BoxVariants } from './box.css';

type BoxProps<TUse extends React.ElementType> =
  PolymorphicComponentProps<TUse> & {
    /**
     * The main variation of the box
     */
    variant?: BoxVariants['variant'];

    /**
     * The spacing between the box borders and its contents
     */
    spacing?: BoxVariants['spacing'];

    /**
     * The elevation of the box
     */
    elevation?: BoxVariants['elevation'];

    /**
     * The radius of the box
     */
    radius?: BoxVariants['radius'];
  };

/**
 * A evenly spaced container for grouping related elements. Can
 * be styled with colors, borders, and shadows.
 *
 * https://every-layout.dev/layouts/box
 */
export const Box = <TUse extends React.ElementType = 'div'>({
  spacing,
  radius,
  elevation,
  className,
  variant,
  ...props
}: BoxProps<TUse>) => {
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
};
