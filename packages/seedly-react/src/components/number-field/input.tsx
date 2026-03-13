import {
  NumberField,
  type NumberFieldInputProps,
} from '@base-ui/react/number-field';
import { input as inputClassName } from '@kalink-ui/seedly/components/number-field';

import { mergeClassName } from '../../utils/merge-class-name';

export function Input({ className, ...props }: NumberFieldInputProps) {
  return (
    <NumberField.Input
      {...props}
      className={mergeClassName(inputClassName, className)}
    />
  );
}
