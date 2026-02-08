import { Field, type FieldErrorProps } from '@base-ui/react/field';
import { error as errorClassName } from '@kalink-ui/seedly/components/field';

import { mergeClassName } from '@/utils/merge-class-name';

export function Error({ className, ...props }: FieldErrorProps) {
  return (
    <Field.Error
      {...props}
      className={mergeClassName(errorClassName, className)}
    />
  );
}
