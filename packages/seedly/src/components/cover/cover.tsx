'use client';

import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { coverRecipe, CoverVariants, minSizeVar } from './cover.css';

type CoverProps<TUse extends ElementType> = PolymorphicComponentProps<TUse> &
  CoverVariants & {
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
export function Cover<TUse extends ElementType>({
  spacing,
  minSize,
  className,
  ...props
}: CoverProps<TUse>) {
  const { use: Comp = 'div', ...rest } = props;

  return (
    <Comp
      className={clsx(coverRecipe({ spacing }), className)}
      style={assignInlineVars({
        ...(minSize && { [minSizeVar]: minSize }),
      })}
      {...rest}
    />
  );
}
