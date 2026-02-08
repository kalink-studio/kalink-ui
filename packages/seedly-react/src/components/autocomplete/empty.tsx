import {
  Autocomplete,
  type AutocompleteEmptyProps,
} from '@base-ui/react/autocomplete';
import { empty as emptyClassName } from '@kalink-ui/seedly/components/autocomplete';

import { mergeClassName } from '@/utils/merge-class-name';

export function Empty({ className, ...props }: AutocompleteEmptyProps) {
  return (
    <Autocomplete.Empty
      {...props}
      className={mergeClassName(emptyClassName, className)}
    />
  );
}
