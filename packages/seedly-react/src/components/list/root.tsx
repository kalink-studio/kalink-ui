import { useRender } from '@base-ui/react/use-render';
import {
  listResponsive,
  type ListVariants,
} from '@kalink-ui/seedly/components/list';

import { mergeClassName } from '@/utils/merge-class-name';

import type { Responsive } from '@kalink-ui/seedly/styles';

interface ListBaseProps extends Omit<
  ListVariants,
  | 'itemSpacing'
  | 'itemInlineSpacing'
  | 'orientation'
  | 'justify'
  | 'align'
  | 'markerPosition'
> {
  itemSpacing?: NonNullable<ListVariants['itemSpacing']>;
  itemInlineSpacing?: NonNullable<ListVariants['itemInlineSpacing']>;
  orientation?: Responsive<NonNullable<ListVariants['orientation']>>;
  justify?: Responsive<NonNullable<ListVariants['justify']>>;
  align?: Responsive<NonNullable<ListVariants['align']>>;
  markerPosition?: Responsive<NonNullable<ListVariants['markerPosition']>>;
}

interface UnorderedListProps extends ListBaseProps {
  listType?: 'unordered';
}

interface OrderedListProps extends ListBaseProps {
  listType: 'ordered';
  start?: number;
  reversed?: boolean;
  type?: '1' | 'a' | 'A' | 'i' | 'I';
}

export type ListProps = (
  | (useRender.ComponentProps<'ul'> & UnorderedListProps)
  | (useRender.ComponentProps<'ol'> & OrderedListProps)
) & {
  render?: React.ReactElement;
};

export function List({
  listType = 'unordered',
  listStyle = 'none',
  orientation = 'vertical',
  markerPosition = 'outside',
  itemSpacing,
  itemInlineSpacing,
  justify,
  align,
  className,
  render,
  ...props
}: ListProps) {
  const defaultTagName = listType === 'ordered' ? 'ol' : 'ul';

  return useRender({
    render,
    defaultTagName,
    props: {
      ...props,
      className: mergeClassName(
        listResponsive({
          listStyle,
          orientation,
          itemSpacing,
          itemInlineSpacing,
          justify,
          align,
          markerPosition,
        }),
        className,
      ),
    },
  });
}
