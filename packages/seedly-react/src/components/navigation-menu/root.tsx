import {
  NavigationMenu,
  type NavigationMenuRootProps,
} from '@base-ui/react/navigation-menu';
import { root as rootClassName } from '@kalink-ui/seedly/components/navigation-menu';

import { mergeClassName } from '../../utils/merge-class-name';
import { SolidShell } from '../_internal/solid-shell';

export function Root({ className, render, ...props }: NavigationMenuRootProps) {
  return (
    <NavigationMenu.Root
      {...props}
      render={render ?? <SolidShell />}
      className={mergeClassName(rootClassName, className)}
    />
  );
}
