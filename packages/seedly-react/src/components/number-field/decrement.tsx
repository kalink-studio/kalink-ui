import {
  NumberField,
  type NumberFieldDecrementProps,
} from '@base-ui/react/number-field';
import { decrement as decrementClassName } from '@kalink-ui/seedly/components/number-field';

import { mergeClassName } from '@/utils/merge-class-name';

export function Decrement({ className, ...props }: NumberFieldDecrementProps) {
  return (
    <NumberField.Decrement
      {...props}
      className={mergeClassName(decrementClassName, className)}
    />
  );
}
