import { AlertDialog } from '@base-ui/react/alert-dialog';
import { backdrop as backdropClassName } from '@kalink-ui/seedly/components/alert-dialog';

import { mergeClassName } from '@/utils/merge-class-name';

import type { DialogBackdropProps } from '@base-ui/react/dialog';

export function Backdrop({ className, ...props }: DialogBackdropProps) {
  return (
    <AlertDialog.Backdrop
      {...props}
      className={mergeClassName(backdropClassName, className)}
    />
  );
}
