import { AlertDialog } from '@base-ui/react/alert-dialog';
import { button as buttonClassName } from '@kalink-ui/seedly/components/alert-dialog';

import { mergeClassName } from '@/utils/merge-class-name';

import type { DialogCloseProps } from '@base-ui/react/dialog';

export function Close({ className, ...props }: DialogCloseProps) {
  return (
    <AlertDialog.Close
      {...props}
      className={mergeClassName(buttonClassName, className)}
    />
  );
}
