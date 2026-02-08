import { Combobox, type ComboboxEmptyProps } from '@base-ui/react/combobox';
import { empty as emptyClassName } from '@kalink-ui/seedly/components/combobox';

import { mergeClassName } from '@/utils/merge-class-name';

export function Empty({ className, ...props }: ComboboxEmptyProps) {
  return (
    <Combobox.Empty
      {...props}
      className={mergeClassName(emptyClassName, className)}
    />
  );
}
