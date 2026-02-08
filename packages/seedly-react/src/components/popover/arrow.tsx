import { Popover, type PopoverArrowProps } from '@base-ui/react/popover';
import { arrow as arrowClassName } from '@kalink-ui/seedly/components/popover';

import { mergeClassName } from '@/utils/merge-class-name';

export function Arrow({ className, ...props }: PopoverArrowProps) {
  return (
    <Popover.Arrow
      {...props}
      className={mergeClassName(arrowClassName, className)}
    />
  );
}
