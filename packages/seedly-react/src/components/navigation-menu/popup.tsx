import {
  NavigationMenu,
  type NavigationMenuPopupProps,
} from '@base-ui/react/navigation-menu';
import { popup as popupClassName } from '@kalink-ui/seedly/components/navigation-menu';

import { mergeClassName } from '../../utils/merge-class-name';

export function Popup({ className, ...props }: NavigationMenuPopupProps) {
  return (
    <NavigationMenu.Popup
      {...props}
      className={mergeClassName(popupClassName, className)}
    />
  );
}
