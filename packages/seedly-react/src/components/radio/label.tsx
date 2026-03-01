import { label as labelClassName } from '@kalink-ui/seedly/components/radio';

import { Label as BaseLabel, type LabelProps } from '../label';
import { mergeClassName } from '@/utils/merge-class-name';

export type RadioLabelProps = Omit<LabelProps, 'variant'>;

export function Label({ className, ...props }: RadioLabelProps) {
  return (
    <BaseLabel
      {...props}
      variant="choice"
      className={mergeClassName(labelClassName, className)}
    />
  );
}
