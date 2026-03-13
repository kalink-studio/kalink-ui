import {
  NumberField,
  type NumberFieldGroupProps,
} from '@base-ui/react/number-field';
import { group as groupClassName } from '@kalink-ui/seedly/components/number-field';

import { mergeClassName } from '../../utils/merge-class-name';

export function Group({ className, ...props }: NumberFieldGroupProps) {
  return (
    <NumberField.Group
      {...props}
      className={mergeClassName(groupClassName, className)}
    />
  );
}
