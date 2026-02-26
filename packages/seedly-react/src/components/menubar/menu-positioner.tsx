import { type MenuPositionerProps } from '@base-ui/react/menu';
import { menuPositioner as menuPositionerClassName } from '@kalink-ui/seedly/components/menubar';

import { Menu } from '../menu';
import { mergeClassName } from '@/utils/merge-class-name';

export function Positioner({ className, ...props }: MenuPositionerProps) {
  return (
    <Menu.Positioner
      {...props}
      className={mergeClassName(menuPositionerClassName, className)}
    />
  );
}
