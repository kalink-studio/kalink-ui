import {
  Autocomplete,
  type AutocompleteItemProps,
} from '@base-ui/react/autocomplete';
import { item as itemClassName } from '@kalink-ui/seedly/components/autocomplete';

import { mergeClassName } from '@/utils/merge-class-name';

export function Item({ className, ...props }: AutocompleteItemProps) {
  return (
    <Autocomplete.Item
      {...props}
      className={mergeClassName(itemClassName, className)}
    />
  );
}
