import { useRender } from '@base-ui/react/use-render';
import {
  gridResponsive,
  gridVars,
  type GridVariants,
} from '@kalink-ui/seedly/components/grid';
import {
  defaultOrder,
  resolveResponsive,
  type BreakpointWithBase,
  type Responsive,
} from '@kalink-ui/seedly/styles';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import { mergeClassName } from '../../utils/merge-class-name';

interface GridVariantResponsive {
  spacing?: NonNullable<GridVariants['spacing']>;
  columnSpacing?: NonNullable<GridVariants['columnSpacing']>;
  rowSpacing?: NonNullable<GridVariants['rowSpacing']>;
  columns?: Responsive<NonNullable<GridVariants['columns']>>;
  autoLayout?: Responsive<NonNullable<GridVariants['autoLayout']>>;
  justifyItems?: Responsive<NonNullable<GridVariants['justifyItems']>>;
  alignItems?: Responsive<NonNullable<GridVariants['alignItems']>>;
  justifyContent?: Responsive<NonNullable<GridVariants['justifyContent']>>;
  alignContent?: Responsive<NonNullable<GridVariants['alignContent']>>;
}

export type GridProps = useRender.ComponentProps<'div'> &
  GridVariantResponsive & {
    minSize?: string;
  };

function pickColumnsWithoutAutoLayout(
  columns: Partial<
    Record<BreakpointWithBase, NonNullable<GridVariants['columns']>>
  >,
  autoLayout: Partial<
    Record<BreakpointWithBase, NonNullable<GridVariants['autoLayout']>>
  >,
): Responsive<NonNullable<GridVariants['columns']>> | undefined {
  const filteredColumns: Partial<
    Record<BreakpointWithBase, NonNullable<GridVariants['columns']>>
  > = {};

  for (const breakpoint of defaultOrder) {
    const columnValue = columns[breakpoint];

    if (columnValue == null) {
      continue;
    }

    if (autoLayout[breakpoint] != null) {
      continue;
    }

    filteredColumns[breakpoint] = columnValue;
  }

  if (Object.keys(filteredColumns).length === 0) {
    return undefined;
  }

  return filteredColumns;
}

export function Grid({
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
  render,
  ...props
}: GridProps) {
  const autoLayoutMap = resolveResponsive(autoLayout, defaultOrder);
  const columnsMap = resolveResponsive(columns, defaultOrder);
  const columnsForLayout = pickColumnsWithoutAutoLayout(
    columnsMap,
    autoLayoutMap,
  );

  const style =
    minSize == null
      ? props.style
      : {
          ...props.style,
          ...assignInlineVars({
            [gridVars.layout.rootMinCellSize]: minSize,
          }),
        };

  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      style,
      className: mergeClassName(
        gridResponsive({
          spacing,
          columnSpacing,
          rowSpacing,
          columns: columnsForLayout,
          autoLayout,
          justifyItems,
          alignItems,
          justifyContent,
          alignContent,
        }),
        className,
      ),
    },
  });
}
