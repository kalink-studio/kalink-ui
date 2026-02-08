import { Popover, type PopoverDescriptionProps } from '@base-ui/react/popover';
import { description as descriptionClassName } from '@kalink-ui/seedly/components/popover';

import { mergeClassName } from '@/utils/merge-class-name';

export function Description({ className, ...props }: PopoverDescriptionProps) {
  return (
    <Popover.Description
      {...props}
      className={mergeClassName(descriptionClassName, className)}
    />
  );
}
