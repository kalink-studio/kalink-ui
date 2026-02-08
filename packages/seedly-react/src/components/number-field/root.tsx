import {
  NumberField,
  type NumberFieldRootProps,
} from '@base-ui/react/number-field';
import { field as fieldClassName } from '@kalink-ui/seedly/components/number-field';

import { mergeClassName } from '@/utils/merge-class-name';

export function Root({ className, ...props }: NumberFieldRootProps) {
  return (
    <NumberField.Root
      {...props}
      className={mergeClassName(fieldClassName, className)}
    />
  );
}
