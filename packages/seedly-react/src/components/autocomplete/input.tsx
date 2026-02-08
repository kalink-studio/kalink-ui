import {
  Autocomplete,
  type AutocompleteInputProps,
} from '@base-ui/react/autocomplete';
import { input as inputClassName } from '@kalink-ui/seedly/components/autocomplete';

import { mergeClassName } from '@/utils/merge-class-name';

export function Input({ className, ...props }: AutocompleteInputProps) {
  return (
    <Autocomplete.Input
      {...props}
      className={mergeClassName(inputClassName, className)}
    />
  );
}
