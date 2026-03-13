import { Field, type FieldLabelProps } from '@base-ui/react/field';
import { label as labelClassName } from '@kalink-ui/seedly/components/checkbox';
import { labelRecipe } from '@kalink-ui/seedly/components/label';

import { mergeClassName } from '../../utils/merge-class-name';
import { Label as BaseLabel } from '../label';

export type CheckboxLabelProps = FieldLabelProps;

export function Label({ className, render, ...props }: CheckboxLabelProps) {
  return (
    <Field.Root render={<span />}>
      <Field.Label
        {...props}
        className={mergeClassName(
          labelRecipe({ variant: 'choice' }),
          labelClassName,
          className,
        )}
        render={render ?? <BaseLabel variant="choice" />}
      />
    </Field.Root>
  );
}
