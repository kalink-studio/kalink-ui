import {
  NumberField,
  type NumberFieldIncrementProps,
} from '@base-ui/react/number-field';
import { increment as incrementClassName } from '@kalink-ui/seedly/components/number-field';

import { mergeClassName } from '@/utils/merge-class-name';

export function Increment({ className, ...props }: NumberFieldIncrementProps) {
  return (
    <NumberField.Increment
      {...props}
      className={mergeClassName(incrementClassName, className)}
    />
  );
}
