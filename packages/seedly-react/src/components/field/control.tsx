import { Field, type FieldControlProps } from '@base-ui/react/field';
import { input as inputClassName } from '@kalink-ui/seedly/components/field';

import { mergeClassName } from '../../utils/merge-class-name';

export function Control({ className, ...props }: FieldControlProps) {
  return (
    <Field.Control
      {...props}
      className={mergeClassName(inputClassName, className)}
    />
  );
}
