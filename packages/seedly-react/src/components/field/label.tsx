import {
  Field,
  type FieldLabelProps as BaseFieldLabelProps,
} from '@base-ui/react/field';
import { label as labelClassName } from '@kalink-ui/seedly/components/field';
import { labelRecipe } from '@kalink-ui/seedly/components/label';

import { Label as BaseLabel, type LabelProps } from '../label';
import { mergeClassName } from '@/utils/merge-class-name';

export type FieldLabelProps = BaseFieldLabelProps & Pick<LabelProps, 'variant'>;

export function Label({
  className,
  render,
  variant = 'field',
  ...props
}: FieldLabelProps) {
  return (
    <Field.Label
      {...props}
      className={mergeClassName(
        labelRecipe({ variant }),
        labelClassName,
        className,
      )}
      render={render ?? <BaseLabel variant={variant} />}
    />
  );
}
