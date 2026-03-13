import {
  Menubar as BaseMenubar,
  type MenubarProps,
} from '@base-ui/react/menubar';
import { menubar as menubarClassName } from '@kalink-ui/seedly/components/menubar';

import { mergeClassName } from '../../utils/merge-class-name';
import { SolidShell } from '../_internal/solid-shell';

export function Menubar({ className, render, ...props }: MenubarProps) {
  return (
    <BaseMenubar
      {...props}
      render={render ?? <SolidShell />}
      className={mergeClassName(menubarClassName, className)}
    />
  );
}
