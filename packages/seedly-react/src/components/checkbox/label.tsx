import { label as labelClassName } from '@kalink-ui/seedly/components/checkbox';

import { Label as BaseLabel, type LabelProps } from '../label';
import { mergeClassName } from '@/utils/merge-class-name';

export type CheckboxLabelProps = Omit<LabelProps, 'variant'>;

export function Label({ className, ...props }: CheckboxLabelProps) {
  return (
    <BaseLabel
      {...props}
      variant="choice"
      className={mergeClassName(labelClassName, className)}
    />
  );
}
