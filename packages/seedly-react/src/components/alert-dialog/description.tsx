import { AlertDialog } from '@base-ui/react/alert-dialog';
import { description as descriptionClassName } from '@kalink-ui/seedly/components/alert-dialog';

import { mergeClassName } from '@/utils/merge-class-name';

import type { DialogDescriptionProps } from '@base-ui/react/dialog';

export function Description({ className, ...props }: DialogDescriptionProps) {
  return (
    <AlertDialog.Description
      {...props}
      className={mergeClassName(descriptionClassName, className)}
    />
  );
}
