import { label as labelClassName } from '@kalink-ui/seedly/components/combobox';

import { Label as BaseLabel, type LabelProps } from '../label';
import { mergeClassName } from '@/utils/merge-class-name';

export type ComboboxLabelProps = Omit<LabelProps, 'variant'>;

export function Label({ className, ...props }: ComboboxLabelProps) {
  return (
    <BaseLabel
      {...props}
      variant="field"
      className={mergeClassName(labelClassName, className)}
    />
  );
}
