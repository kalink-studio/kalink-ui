import { Menu, type MenuPopupProps } from '@base-ui/react/menu';
import { popup as popupClassName } from '@kalink-ui/seedly/components/menu';

import { mergeClassName } from '../../utils/merge-class-name';

export function Popup({ className, ...props }: MenuPopupProps) {
  return (
    <Menu.Popup
      {...props}
      className={mergeClassName(popupClassName, className)}
    />
  );
}
