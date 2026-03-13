import {
  NavigationMenu,
  type NavigationMenuItemProps,
} from '@base-ui/react/navigation-menu';

export function Item({ role = 'menuitem', ...props }: NavigationMenuItemProps) {
  return <NavigationMenu.Item {...props} role={role} />;
}
