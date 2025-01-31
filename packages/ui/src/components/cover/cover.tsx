'use client';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { PolymorphicComponentProps } from '@/types/utils.types';

import { coverRecipe, CoverVariants, minSizeVar } from './cover.css';

type CoverProps<TUse extends ElementType> = PolymorphicComponentProps<TUse> & {
  /**
   * The spacing between items
   */
  spacing?: CoverVariants['spacing'];

  /**
   * True if the cover should have no padding
   */
  noPad?: CoverVariants['noPad'];

  /**
   * The minimum height of the cover
   */
  minSize?: string;
};

/**
 * A custom element for covering a block-level element horizontally,
 * with a max-width value representing the typographic measure.
 *
 * The element that should be towards the vertical center of the space
 * is identified with a simple `data-cover-center` attribute.
 *
 * https://every-layout.dev/layouts/cover
 */
export const Cover = <TUse extends ElementType>({
  spacing,
  noPad,
  minSize,
  className,
  ...props
}: CoverProps<TUse>) => {
  const { use: Comp = 'div', ...rest } = props;

  return (
    <Comp
      className={clsx(coverRecipe({ spacing, noPad }), className)}
      style={assignInlineVars({
        ...(minSize && { [minSizeVar]: minSize }),
      })}
      {...rest}
    />
  );
};
