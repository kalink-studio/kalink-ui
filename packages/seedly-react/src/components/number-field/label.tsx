import { label as labelClassName } from '@kalink-ui/seedly/components/number-field';

import { mergeClassName } from '../../utils/merge-class-name';
import { Label as BaseLabel, type LabelProps } from '../label';

export type NumberFieldLabelProps = Omit<LabelProps, 'variant'>;

export function Label({ className, ...props }: NumberFieldLabelProps) {
  return (
    <BaseLabel
      {...props}
      variant="field"
      className={mergeClassName(labelClassName, className)}
    />
  );
}
