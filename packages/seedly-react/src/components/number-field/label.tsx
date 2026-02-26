import { label as labelClassName } from '@kalink-ui/seedly/components/number-field';

import { Label as BaseLabel, type LabelProps } from '../label';
import { mergeClassName } from '@/utils/merge-class-name';

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
