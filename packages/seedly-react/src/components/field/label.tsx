import { Field, type FieldLabelProps } from '@base-ui/react/field';
import { label as labelClassName } from '@kalink-ui/seedly/components/field';
import { labelRecipe } from '@kalink-ui/seedly/components/label';

import { mergeClassName } from '@/utils/merge-class-name';

export function Label({ className, ...props }: FieldLabelProps) {
  const baseClassName = `${labelRecipe({ variant: 'field' })} ${labelClassName}`;

  return (
    <Field.Label
      {...props}
      className={mergeClassName(baseClassName, className)}
    />
  );
}
