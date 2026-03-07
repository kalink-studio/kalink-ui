import { Select, type SelectItemIndicatorProps } from '@base-ui/react/select';
import { itemIndicator as itemIndicatorClassName } from '@kalink-ui/seedly/components/select';

import { mergeClassName } from '../../utils/merge-class-name';

export function ItemIndicator({
  className,
  ...props
}: SelectItemIndicatorProps) {
  return (
    <Select.ItemIndicator
      {...props}
      className={mergeClassName(itemIndicatorClassName, className)}
    />
  );
}
