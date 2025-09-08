'use client';

import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { gridChildResponsive } from './grid-child.responsive';

import type { GridChildVariants } from './grid-child.css';
import type { Responsive } from '../../styles/responsive';

type GridChildVariantResponsive = {
  [K in keyof GridChildVariants]?: Responsive<
    NonNullable<GridChildVariants[K]>
  >;
};

type GridChildProps<TUse extends ElementType> =
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
      className={clsx(
        gridChildResponsive({
          colSpan,
          rowSpan,
          colStart,
          colEnd,
          rowStart,
          rowEnd,
          justifySelf,
          alignSelf,
        }),
        className,
      )}
      {...(domProps as Record<string, unknown>)}
    />
  );
}
