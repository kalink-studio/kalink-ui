import { label as labelClassName } from '@kalink-ui/seedly/components/input';

import { mergeClassName } from '../../utils/merge-class-name';
import { Label as BaseLabel, type LabelProps } from '../label';

export type InputLabelProps = Omit<LabelProps, 'variant'>;

export function InputLabel({ className, ...props }: InputLabelProps) {
  return (
    <BaseLabel
      {...props}
      variant="field"
      className={mergeClassName(labelClassName, className)}
    />
  );
}
