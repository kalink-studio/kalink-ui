import { Menu, type MenuItemProps } from '@base-ui/react/menu';
import { item as itemClassName } from '@kalink-ui/seedly/components/menu';

import { mergeClassName } from '@/utils/merge-class-name';

export function Item({ className, ...props }: MenuItemProps) {
  return (
    <Menu.Item
      {...props}
      className={mergeClassName(itemClassName, className)}
    />
  );
}
