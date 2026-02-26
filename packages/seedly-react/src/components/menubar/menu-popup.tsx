import { type MenuPopupProps } from '@base-ui/react/menu';
import { menuPopup as menuPopupClassName } from '@kalink-ui/seedly/components/menubar';

import { Menu } from '../menu';
import { mergeClassName } from '@/utils/merge-class-name';

export function Popup({ className, ...props }: MenuPopupProps) {
  return (
    <Menu.Popup
      {...props}
      className={mergeClassName(menuPopupClassName, className)}
    />
  );
}
