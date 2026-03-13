import { label as labelClassName } from '@kalink-ui/seedly/components/switch';

import { mergeClassName } from '../../utils/merge-class-name';
import { Label as BaseLabel, type LabelProps } from '../label';

export type SwitchLabelProps = Omit<LabelProps, 'variant'>;

export function Label({ className, ...props }: SwitchLabelProps) {
  return (
    <BaseLabel
      {...props}
      variant="choice"
      className={mergeClassName(labelClassName, className)}
    />
  );
}
