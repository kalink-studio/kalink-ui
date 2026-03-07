import {
  NavigationMenu,
  type NavigationMenuBackdropProps,
} from '@base-ui/react/navigation-menu';
import { backdrop } from '@kalink-ui/seedly/components/navigation-menu';

import { mergeClassName } from '../../utils/merge-class-name';

export function Backdrop({ className, ...props }: NavigationMenuBackdropProps) {
  return (
    <NavigationMenu.Backdrop
      {...props}
      className={mergeClassName(backdrop, className)}
    />
  );
}
