import {
  Separator as BaseSeparator,
  type SeparatorProps,
} from '@base-ui/react/separator';
import { separator as separatorClassName } from '@kalink-ui/seedly/components/separator';

import { mergeClassName } from '../../utils/merge-class-name';

export function Separator({ className, ...props }: SeparatorProps) {
  return (
    <BaseSeparator
      {...props}
      className={mergeClassName(separatorClassName, className)}
    />
  );
}
