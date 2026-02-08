import { Toast, type ToastDescriptionProps } from '@base-ui/react/toast';
import { description as descriptionClassName } from '@kalink-ui/seedly/components/toast';

import { mergeClassName } from '@/utils/merge-class-name';

export function Description({ className, ...props }: ToastDescriptionProps) {
  return (
    <Toast.Description
      {...props}
      className={mergeClassName(descriptionClassName, className)}
    />
  );
}
