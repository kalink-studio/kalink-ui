'use client';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { PolymorphicComponentProps } from '../../types/utils.types';

import { gridRecipe, GridVariants, minSizeVar } from './grid.css';

type GridProps<TUse extends ElementType> = PolymorphicComponentProps<TUse> & {
  /**
   * The minimum size of a grid cell
   */
  minSize?: string;

  /**
   * The spacing between the grid cell
   */
  spacing?: GridVariants['spacing'];
};

/**
 * The Grid layout provides a flexible, responsive grid system that
 * arranges elements in a structured, multi-column format, automatically
 * adjusting the number of columns based on the available space and
 * predefined constraints.
 *
 * https://every-layout.dev/layouts/grid/
 */
export const Grid = <TUse extends ElementType>({
  spacing,
  minSize,
  className,
  ...props
}: GridProps<TUse>) => {
  const { use: Comp = 'div', ...rest } = props;

  return (
    <Comp
      className={clsx(gridRecipe({ spacing }), className)}
      style={assignInlineVars({
        ...(minSize && { [minSizeVar]: minSize }),
      })}
      {...rest}
    />
  );
};
