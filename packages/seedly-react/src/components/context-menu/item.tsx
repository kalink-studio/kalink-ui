import {
  ContextMenu,
  type ContextMenuItemProps,
} from '@base-ui/react/context-menu';
import { item as itemClassName } from '@kalink-ui/seedly/components/context-menu';

import { mergeClassName } from '@/utils/merge-class-name';

export function Item({ className, ...props }: ContextMenuItemProps) {
  return (
    <ContextMenu.Item
      {...props}
      className={mergeClassName(itemClassName, className)}
    />
  );
}
