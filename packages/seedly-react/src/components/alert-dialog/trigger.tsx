import { AlertDialog } from '@base-ui/react/alert-dialog';
import { button as buttonClassName } from '@kalink-ui/seedly/components/alert-dialog';

import { mergeClassName } from '@/utils/merge-class-name';

import type { DialogTriggerProps } from '@base-ui/react/dialog';

export function Trigger({ className, ...props }: DialogTriggerProps) {
  return (
    <AlertDialog.Trigger
      {...props}
      className={mergeClassName(buttonClassName, className)}
    />
  );
}
