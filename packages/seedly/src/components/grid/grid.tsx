'use client';

import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { GridVariants, minSizeVar } from './grid.css';
import { gridResponsive } from './grid.responsive';

import type { Responsive } from '../../styles/responsive';

type GridVariantResponsive = {
  [K in keyof GridVariants]?: Responsive<NonNullable<GridVariants[K]>>;
};

type GridProps<TUse extends ElementType> = PolymorphicComponentProps<TUse> &
  GridVariantResponsive & {
    /**
     * The minimum size of a grid cell
     */
    minSize?: string;
  };

/**
 * The Grid layout provides a flexible, responsive grid system. It can also
 * arranges elements in a structured, multi-column format, automatically
 * adjusting the number of columns based on the available space and
 * predefined constraints.
 *
 * https://every-layout.dev/layouts/grid/
 */
export function Grid<TUse extends ElementType>(props: GridProps<TUse>) {
  const {
    use: Comp = 'div',
    minSize,
    className,
    spacing,
    columnSpacing,
    rowSpacing,
    columns = { xs: 4, md: 8, lg: 12 },
    autoLayout,
    justifyItems,
    alignItems,
    justifyContent,
    alignContent,
    ...rest
  } = props;

  return (
    <Comp
      className={clsx(
        gridResponsive({
          spacing,
          columnSpacing,
          rowSpacing,
          columns: autoLayout ? undefined : columns,
          autoLayout,
          justifyItems,
          alignItems,
          justifyContent,
          alignContent,
        }),
        className,
      )}
      style={assignInlineVars({
        ...(minSize && { [minSizeVar]: minSize }),
      })}
      {...(rest as Record<string, unknown>)}
    />
  );
}
