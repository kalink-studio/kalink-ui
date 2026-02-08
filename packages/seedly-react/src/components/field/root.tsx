import { Field, type FieldRootProps } from '@base-ui/react/field';
import { field as fieldClassName } from '@kalink-ui/seedly/components/field';

import { mergeClassName } from '@/utils/merge-class-name';

export function Root({ className, ...props }: FieldRootProps) {
  return (
    <Field.Root
      {...props}
      className={mergeClassName(fieldClassName, className)}
    />
  );
}
