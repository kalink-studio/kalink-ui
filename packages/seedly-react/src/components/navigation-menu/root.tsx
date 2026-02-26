import {
  NavigationMenu,
  type NavigationMenuRootProps,
} from '@base-ui/react/navigation-menu';
import { root as rootClassName } from '@kalink-ui/seedly/components/navigation-menu';

import { SolidShell } from '@/components/_internal/solid-shell';
import { mergeClassName } from '@/utils/merge-class-name';

export function Root({ className, render, ...props }: NavigationMenuRootProps) {
  return (
    <NavigationMenu.Root
      {...props}
      render={render ?? <SolidShell />}
      className={mergeClassName(rootClassName, className)}
    />
  );
}
