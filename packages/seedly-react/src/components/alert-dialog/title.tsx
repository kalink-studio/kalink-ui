import { AlertDialog } from '@base-ui/react/alert-dialog';
import { title as titleClassName } from '@kalink-ui/seedly/components/alert-dialog';

import { mergeClassName } from '@/utils/merge-class-name';

import type { DialogTitleProps } from '@base-ui/react/dialog';

export function Title({ className, ...props }: DialogTitleProps) {
  return (
    <AlertDialog.Title
      {...props}
      className={mergeClassName(titleClassName, className)}
    />
  );
}
