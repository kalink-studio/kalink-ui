import { clsx } from 'clsx';
import { ElementType } from 'react';

import { PolymorphicComponentProps } from '@/types/utils.types';

import { centerRecipe, CenterVariants } from './center.css';

type CenterProps<TUse extends ElementType> = PolymorphicComponentProps<TUse> & {
  /**
   * Center align the text too with `text-align: center`
   */
  andText?: CenterVariants['andText'];

  /**
   * Center child elements based on their content width
   */
  intrinsic?: CenterVariants['intrinsic'];

  /**
   * The minimum space on either side of the content
   */
  gutters?: CenterVariants['gutters'];
};

/**
 * A custom element for centering a block-level element horizontally,
 * with a max-width value representing the typographic measure.
 *
 * https://every-layout.dev/layouts/center
 */
export const Center = <TUse extends ElementType>({
  andText,
  gutters,
  intrinsic,
  className,
  ...props
}: CenterProps<TUse>) => {
  const { use: Comp = 'div', ...rest } = props;

  return (
    <Comp
      className={clsx(centerRecipe({ andText, gutters, intrinsic }), className)}
      {...rest}
    />
  );
};
