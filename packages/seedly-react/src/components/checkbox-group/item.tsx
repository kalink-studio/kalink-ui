import { item as itemClassName } from '@kalink-ui/seedly/components/checkbox-group';

import { Label as BaseLabel, type LabelProps } from '../label';
import { mergeClassName } from '@/utils/merge-class-name';

export type ItemProps = Omit<LabelProps, 'variant'>;

export function Item({ className, ...props }: ItemProps) {
  return (
    <BaseLabel
      {...props}
      variant="choice"
      className={mergeClassName(itemClassName, className)}
    />
  );
}
