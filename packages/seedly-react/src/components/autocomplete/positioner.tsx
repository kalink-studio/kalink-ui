import {
  Autocomplete,
  type AutocompletePositionerProps,
} from '@base-ui/react/autocomplete';
import { positioner as positionerClassName } from '@kalink-ui/seedly/components/autocomplete';

import { mergeClassName } from '../../utils/merge-class-name';

export function Positioner({
  className,
  ...props
}: AutocompletePositionerProps) {
  return (
    <Autocomplete.Positioner
      {...props}
      className={mergeClassName(positionerClassName, className)}
    />
  );
}
