import { Combobox, type ComboboxClearProps } from '@base-ui/react/combobox';
import { clear as clearClassName } from '@kalink-ui/seedly/components/combobox';

import { mergeClassName } from '@/utils/merge-class-name';

export function Clear({ className, ...props }: ComboboxClearProps) {
  return (
    <Combobox.Clear
      {...props}
      className={mergeClassName(clearClassName, className)}
    />
  );
}
