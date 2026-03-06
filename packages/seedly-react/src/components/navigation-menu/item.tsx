import {
  NavigationMenu,
  type NavigationMenuItemProps,
} from '@base-ui/react/navigation-menu';

import type { Ref } from 'react';

type ItemProps = Omit<NavigationMenuItemProps, 'ref'> & {
  ref?: Ref<HTMLDivElement>;
};

export function Item({ role = 'menuitem', ...props }: ItemProps) {
  return <NavigationMenu.Item {...props} role={role} />;
}
