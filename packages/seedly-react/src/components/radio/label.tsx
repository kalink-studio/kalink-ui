import { Field, type FieldLabelProps } from '@base-ui/react/field';
import { labelRecipe } from '@kalink-ui/seedly/components/label';
import { label as labelClassName } from '@kalink-ui/seedly/components/radio';

import { mergeClassName } from '../../utils/merge-class-name';
import { Label as BaseLabel } from '../label';

export type RadioLabelProps = FieldLabelProps;

export function Label({ className, render, ...props }: RadioLabelProps) {
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
