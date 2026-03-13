import {
  NavigationMenu,
  type NavigationMenuListProps,
} from '@base-ui/react/navigation-menu';
import { list as listClassName } from '@kalink-ui/seedly/components/navigation-menu';

import { mergeClassName } from '../../utils/merge-class-name';

export function List({
  className,
  role = 'menubar',
  ...props
}: NavigationMenuListProps) {
  return (
    <NavigationMenu.List
      {...props}
      role={role}
      className={mergeClassName(listClassName, className)}
    />
  );
}
