import {
  NavigationMenu,
  type NavigationMenuViewportProps,
} from '@base-ui/react/navigation-menu';
import { viewport as viewportClassName } from '@kalink-ui/seedly/components/navigation-menu';

import { mergeClassName } from '../../utils/merge-class-name';

export function Viewport({ className, ...props }: NavigationMenuViewportProps) {
  return (
    <NavigationMenu.Viewport
      {...props}
      className={mergeClassName(viewportClassName, className)}
    />
  );
}
