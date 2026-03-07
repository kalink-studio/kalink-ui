import { Menu, type MenuSubmenuTriggerProps } from '@base-ui/react/menu';
import { item as itemClassName } from '@kalink-ui/seedly/components/menu';

import { mergeClassName } from '../../utils/merge-class-name';

export function SubmenuTrigger({
  className,
  ...props
}: MenuSubmenuTriggerProps) {
  return (
    <Menu.SubmenuTrigger
      {...props}
      className={mergeClassName(itemClassName, className)}
    />
  );
}
