import { Field, type FieldLabelProps } from '@base-ui/react/field';
import { label as labelClassName } from '@kalink-ui/seedly/components/field';

import { mergeClassName } from '@/utils/merge-class-name';

export function Label({ className, ...props }: FieldLabelProps) {
  return (
    <Field.Label
      {...props}
      className={mergeClassName(labelClassName, className)}
    />
  );
}
