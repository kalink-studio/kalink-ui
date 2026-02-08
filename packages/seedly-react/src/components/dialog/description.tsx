import { Dialog, type DialogDescriptionProps } from '@base-ui/react/dialog';
import { description as descriptionClassName } from '@kalink-ui/seedly/components/dialog';

import { mergeClassName } from '@/utils/merge-class-name';

export function Description({ className, ...props }: DialogDescriptionProps) {
  return (
    <Dialog.Description
      {...props}
      className={mergeClassName(descriptionClassName, className)}
    />
  );
}
