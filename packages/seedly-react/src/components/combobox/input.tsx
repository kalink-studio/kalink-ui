import { Combobox, type ComboboxInputProps } from '@base-ui/react/combobox';
import { input as inputClassName } from '@kalink-ui/seedly/components/combobox';

import { mergeClassName } from '@/utils/merge-class-name';

export function Input({ className, ...props }: ComboboxInputProps) {
  return (
    <Combobox.Input
      {...props}
      className={mergeClassName(inputClassName, className)}
    />
  );
}
