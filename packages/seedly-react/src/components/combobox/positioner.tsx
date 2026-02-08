import {
  Combobox,
  type ComboboxPositionerProps,
} from '@base-ui/react/combobox';
import { positioner as positionerClassName } from '@kalink-ui/seedly/components/combobox';

import { mergeClassName } from '@/utils/merge-class-name';

export function Positioner({ className, ...props }: ComboboxPositionerProps) {
  return (
    <Combobox.Positioner
      {...props}
      className={mergeClassName(positionerClassName, className)}
    />
  );
}
