import { Combobox, type ComboboxItemProps } from '@base-ui/react/combobox';
import { item as itemClassName } from '@kalink-ui/seedly/components/combobox';

import { mergeClassName } from '../../utils/merge-class-name';

export function Item({ className, ...props }: ComboboxItemProps) {
  return (
    <Combobox.Item
      {...props}
      className={mergeClassName(itemClassName, className)}
    />
  );
}
