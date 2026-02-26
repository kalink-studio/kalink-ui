import { type MenuItemProps } from '@base-ui/react/menu';
import { menuItem as menuItemClassName } from '@kalink-ui/seedly/components/menubar';

import { Menu } from '../menu';
import { mergeClassName } from '@/utils/merge-class-name';

export function Item({ className, ...props }: MenuItemProps) {
  return (
    <Menu.Item
      {...props}
      className={mergeClassName(menuItemClassName, className)}
    />
  );
}
