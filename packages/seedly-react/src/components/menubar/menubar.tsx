import {
  Menubar as BaseMenubar,
  type MenubarProps,
} from '@base-ui/react/menubar';
import { menubar as menubarClassName } from '@kalink-ui/seedly/components/menubar';

import { mergeClassName } from '@/utils/merge-class-name';

export function Menubar({ className, ...props }: MenubarProps) {
  return (
    <BaseMenubar
      {...props}
      className={mergeClassName(menubarClassName, className)}
    />
  );
}
