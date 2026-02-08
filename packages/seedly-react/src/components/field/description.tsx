import { Field, type FieldDescriptionProps } from '@base-ui/react/field';
import { description as descriptionClassName } from '@kalink-ui/seedly/components/field';

import { mergeClassName } from '@/utils/merge-class-name';

export function Description({ className, ...props }: FieldDescriptionProps) {
  return (
    <Field.Description
      {...props}
      className={mergeClassName(descriptionClassName, className)}
    />
  );
}
