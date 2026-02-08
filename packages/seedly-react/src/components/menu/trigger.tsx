import { Menu, type MenuTriggerProps } from '@base-ui/react/menu';
import { button as buttonClassName } from '@kalink-ui/seedly/components/menu';

import { mergeClassName } from '@/utils/merge-class-name';

export function Trigger({ className, ...props }: MenuTriggerProps) {
  return (
    <Menu.Trigger
      {...props}
      className={mergeClassName(buttonClassName, className)}
    />
  );
}
