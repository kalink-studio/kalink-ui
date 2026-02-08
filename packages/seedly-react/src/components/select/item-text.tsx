import { Select, type SelectItemTextProps } from '@base-ui/react/select';
import { itemText as itemTextClassName } from '@kalink-ui/seedly/components/select';

import { mergeClassName } from '@/utils/merge-class-name';

export function ItemText({ className, ...props }: SelectItemTextProps) {
  return (
    <Select.ItemText
      {...props}
      className={mergeClassName(itemTextClassName, className)}
    />
  );
}
