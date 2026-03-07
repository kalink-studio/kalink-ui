import { useRender } from '@base-ui/react/use-render';
import {
  gridChildResponsive,
  type GridChildVariants,
} from '@kalink-ui/seedly/components/grid';

import { mergeClassName } from '../../utils/merge-class-name';

import type { Responsive } from '@kalink-ui/seedly/styles';

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

export type GridChildProps = useRender.ComponentProps<'div'> &
  GridChildVariantResponsive;

export function GridChild({
  colSpan,
  rowSpan,
  colStart,
  colEnd,
  rowStart,
  rowEnd,
  justifySelf,
  alignSelf,
  className,
  render,
  ...props
}: GridChildProps) {
  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      className: mergeClassName(
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
      ),
    },
  });
}
