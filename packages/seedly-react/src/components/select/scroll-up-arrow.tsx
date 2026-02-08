import { Select, type SelectScrollUpArrowProps } from '@base-ui/react/select';
import { scrollArrow as scrollArrowClassName } from '@kalink-ui/seedly/components/select';

import { mergeClassName } from '@/utils/merge-class-name';

export function ScrollUpArrow({
  className,
  ...props
}: SelectScrollUpArrowProps) {
  return (
    <Select.ScrollUpArrow
      {...props}
      className={mergeClassName(scrollArrowClassName, className)}
    />
  );
}
