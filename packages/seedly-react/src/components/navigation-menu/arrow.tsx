import {
  NavigationMenu,
  type NavigationMenuArrowProps,
} from '@base-ui/react/navigation-menu';
import { arrow as arrowClassName } from '@kalink-ui/seedly/components/navigation-menu';

import { mergeClassName } from '@/utils/merge-class-name';

export function Arrow({ className, ...props }: NavigationMenuArrowProps) {
  return (
    <NavigationMenu.Arrow
      {...props}
      className={mergeClassName(arrowClassName, className)}
    />
  );
}
