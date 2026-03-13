import { label as labelClassName } from '@kalink-ui/seedly/components/autocomplete';

import { mergeClassName } from '../../utils/merge-class-name';
import { Label as BaseLabel, type LabelProps } from '../label';

export type AutocompleteLabelProps = Omit<LabelProps, 'variant'>;

export function Label({ className, ...props }: AutocompleteLabelProps) {
  return (
    <BaseLabel
      {...props}
      variant="field"
      className={mergeClassName(labelClassName, className)}
    />
  );
}
