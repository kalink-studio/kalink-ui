import { label as labelClassName } from '@kalink-ui/seedly/components/combobox';

import { mergeClassName } from '../../utils/merge-class-name';
import { Label as BaseLabel, type LabelProps } from '../label';

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
