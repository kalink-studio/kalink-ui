import {
  Autocomplete,
  type AutocompletePopupProps,
} from '@base-ui/react/autocomplete';
import { popup as popupClassName } from '@kalink-ui/seedly/components/autocomplete';

import { mergeClassName } from '@/utils/merge-class-name';

export function Popup({ className, ...props }: AutocompletePopupProps) {
  return (
    <Autocomplete.Popup
      {...props}
      className={mergeClassName(popupClassName, className)}
    />
  );
}
