import { Popover, type PopoverTitleProps } from '@base-ui/react/popover';
import { title as titleClassName } from '@kalink-ui/seedly/components/popover';

import { mergeClassName } from '@/utils/merge-class-name';

export function Title({ className, ...props }: PopoverTitleProps) {
  return (
    <Popover.Title
      {...props}
      className={mergeClassName(titleClassName, className)}
    />
  );
}
