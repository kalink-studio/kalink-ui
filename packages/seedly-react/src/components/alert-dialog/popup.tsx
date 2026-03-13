import { AlertDialog } from '@base-ui/react/alert-dialog';
import { popup as popupClassName } from '@kalink-ui/seedly/components/alert-dialog';

import { mergeClassName } from '../../utils/merge-class-name';

import type { DialogPopupProps } from '@base-ui/react/dialog';

export function Popup({ className, ...props }: DialogPopupProps) {
  return (
    <AlertDialog.Popup
      {...props}
      className={mergeClassName(popupClassName, className)}
    />
  );
}
