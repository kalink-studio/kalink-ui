import { Combobox, type ComboboxListProps } from '@base-ui/react/combobox';
import { list as listClassName } from '@kalink-ui/seedly/components/combobox';

import { mergeClassName } from '@/utils/merge-class-name';

export function List({ className, ...props }: ComboboxListProps) {
  return (
    <Combobox.List
      {...props}
      className={mergeClassName(listClassName, className)}
    />
  );
}
