import { useRender } from '@base-ui/react/use-render';
import { listItemRecipe } from '@kalink-ui/seedly/components/list';

import { mergeClassName } from '../../utils/merge-class-name';

export type ListItemProps = useRender.ComponentProps<'li'>;

export function ListItem({ className, render, ...props }: ListItemProps) {
  return useRender({
    render,
    defaultTagName: 'li',
    props: {
      ...props,
      className: mergeClassName(listItemRecipe(), className),
    },
  });
}
