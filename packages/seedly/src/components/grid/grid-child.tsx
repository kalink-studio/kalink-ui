'use client';

import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { ElementType } from 'react';

import { gridChildResponsive } from './grid-child.responsive';

import type { GridChildVariants } from './grid-child.css';
import type { Responsive } from '../../styles/responsive';

interface GridChildVariantResponsive {
  colSpan?: Responsive<NonNullable<GridChildVariants['colSpan']>>;
  rowSpan?: Responsive<NonNullable<GridChildVariants['rowSpan']>>;
  colStart?: Responsive<NonNullable<GridChildVariants['colStart']>>;
  colEnd?: Responsive<NonNullable<GridChildVariants['colEnd']>>;
  rowStart?: Responsive<NonNullable<GridChildVariants['rowStart']>>;
  rowEnd?: Responsive<NonNullable<GridChildVariants['rowEnd']>>;
  justifySelf?: Responsive<NonNullable<GridChildVariants['justifySelf']>>;
  alignSelf?: Responsive<NonNullable<GridChildVariants['alignSelf']>>;
}

export type GridChildProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> & GridChildVariantResponsive;

export function GridChild<TUse extends ElementType>({
  className,
  ...props
}: GridChildProps<TUse>) {
  const { use: Comp = 'div', ...rest } = props;

  const {
    colSpan,
    rowSpan,
    colStart,
    colEnd,
    rowStart,
    rowEnd,
    justifySelf,
    alignSelf,
    ...domProps
  } = rest as GridChildVariantResponsive & Record<string, unknown>;

  return (
    <Comp
      className={gridChildResponsive(
        {
          colSpan,
          rowSpan,
          colStart,
          colEnd,
          rowStart,
          rowEnd,
          justifySelf,
          alignSelf,
        },
        className,
      )}
      {...(domProps as Record<string, unknown>)}
    />
  );
}
