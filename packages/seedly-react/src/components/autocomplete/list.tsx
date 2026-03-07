import {
  Autocomplete,
  type AutocompleteListProps,
} from '@base-ui/react/autocomplete';
import { list as listClassName } from '@kalink-ui/seedly/components/autocomplete';

import { mergeClassName } from '../../utils/merge-class-name';

export function List({ className, ...props }: AutocompleteListProps) {
  return (
    <Autocomplete.List
      {...props}
      className={mergeClassName(listClassName, className)}
    />
  );
}
