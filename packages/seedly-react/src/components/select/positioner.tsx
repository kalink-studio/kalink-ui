import { Select, type SelectPositionerProps } from '@base-ui/react/select';
import { positioner as positionerClassName } from '@kalink-ui/seedly/components/select';

import { mergeClassName } from '../../utils/merge-class-name';

export function Positioner({ className, ...props }: SelectPositionerProps) {
  return (
    <Select.Positioner
      {...props}
      className={mergeClassName(positionerClassName, className)}
    />
  );
}
