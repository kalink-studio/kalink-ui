import {
  Combobox,
  type ComboboxItemIndicatorProps,
} from '@base-ui/react/combobox';
import { itemIndicator as itemIndicatorClassName } from '@kalink-ui/seedly/components/combobox';

import { mergeClassName } from '@/utils/merge-class-name';

export function ItemIndicator({
  className,
  ...props
}: ComboboxItemIndicatorProps) {
  return (
    <Combobox.ItemIndicator
      {...props}
      className={mergeClassName(itemIndicatorClassName, className)}
    />
  );
}
