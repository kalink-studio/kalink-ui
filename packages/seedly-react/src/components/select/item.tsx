import { Select, type SelectItemProps } from '@base-ui/react/select';
import { item as itemClassName } from '@kalink-ui/seedly/components/select';

import { mergeClassName } from '../../utils/merge-class-name';

export function Item({ className, ...props }: SelectItemProps) {
  return (
    <Select.Item
      {...props}
      className={mergeClassName(itemClassName, className)}
    />
  );
}
