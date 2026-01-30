'use client';

import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ElementType } from 'react';

import { defaultOrder, resolveResponsive } from '../../styles/responsive';

import { gridVars, GridVariants } from './grid.css';
import { gridResponsive } from './grid.responsive';

import type { Responsive } from '../../styles/responsive';

interface GridVariantResponsive {
  spacing?: Responsive<NonNullable<GridVariants['spacing']>>;
  columnSpacing?: Responsive<NonNullable<GridVariants['columnSpacing']>>;
  rowSpacing?: Responsive<NonNullable<GridVariants['rowSpacing']>>;
  columns?: Responsive<NonNullable<GridVariants['columns']>>;
  autoLayout?: Responsive<NonNullable<GridVariants['autoLayout']>>;
  justifyItems?: Responsive<NonNullable<GridVariants['justifyItems']>>;
  alignItems?: Responsive<NonNullable<GridVariants['alignItems']>>;
  justifyContent?: Responsive<NonNullable<GridVariants['justifyContent']>>;
  alignContent?: Responsive<NonNullable<GridVariants['alignContent']>>;
}

export type GridProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> &
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
export function Grid<TUse extends ElementType = 'div'>(props: GridProps<TUse>) {
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

  const autoLayoutMap = resolveResponsive(autoLayout, defaultOrder);
  const columnsMap = resolveResponsive(columns, defaultOrder);
  const columnsEntries = Object.entries(columnsMap).filter(
    ([breakpoint]) => !autoLayoutMap[breakpoint as keyof typeof autoLayoutMap],
  );
  const columnsForLayout = columnsEntries.length
    ? (Object.fromEntries(columnsEntries) as Responsive<
        NonNullable<GridVariants['columns']>
      >)
    : undefined;

  return (
    <Comp
      className={gridResponsive(
        {
          spacing,
          columnSpacing,
          rowSpacing,
          columns: autoLayout ? undefined : columnsForLayout,
          autoLayout,
          justifyItems,
          alignItems,
          justifyContent,
          alignContent,
        },
        className,
      )}
      style={assignInlineVars({
        ...(minSize && { [gridVars.layout.minCellSize]: minSize }),
      })}
      {...(rest as Record<string, unknown>)}
    />
  );
}
