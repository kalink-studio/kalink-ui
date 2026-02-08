import {
  NavigationMenu,
  type NavigationMenuRootProps,
} from '@base-ui/react/navigation-menu';
import { root as rootClassName } from '@kalink-ui/seedly/components/navigation-menu';

import { mergeClassName } from '@/utils/merge-class-name';

export function Root({ className, ...props }: NavigationMenuRootProps) {
  return (
    <NavigationMenu.Root
      {...props}
      className={mergeClassName(rootClassName, className)}
    />
  );
}
