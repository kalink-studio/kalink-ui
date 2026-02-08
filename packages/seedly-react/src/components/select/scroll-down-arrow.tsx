import { Select, type SelectScrollDownArrowProps } from '@base-ui/react/select';
import { scrollArrow as scrollArrowClassName } from '@kalink-ui/seedly/components/select';

import { mergeClassName } from '@/utils/merge-class-name';

export function ScrollDownArrow({
  className,
  ...props
}: SelectScrollDownArrowProps) {
  return (
    <Select.ScrollDownArrow
      {...props}
      className={mergeClassName(scrollArrowClassName, className)}
    />
  );
}
