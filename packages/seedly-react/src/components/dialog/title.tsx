import { Dialog, type DialogTitleProps } from '@base-ui/react/dialog';
import { title as titleClassName } from '@kalink-ui/seedly/components/dialog';

import { mergeClassName } from '@/utils/merge-class-name';

export function Title({ className, ...props }: DialogTitleProps) {
  return (
    <Dialog.Title
      {...props}
      className={mergeClassName(titleClassName, className)}
    />
  );
}
