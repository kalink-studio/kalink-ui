import { Menu, type MenuPositionerProps } from '@base-ui/react/menu';
import { positioner as positionerClassName } from '@kalink-ui/seedly/components/menu';

import { mergeClassName } from '../../utils/merge-class-name';

export function Positioner({ className, ...props }: MenuPositionerProps) {
  return (
    <Menu.Positioner
      {...props}
      className={mergeClassName(positionerClassName, className)}
    />
  );
}
