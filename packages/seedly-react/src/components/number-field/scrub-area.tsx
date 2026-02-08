import {
  NumberField,
  type NumberFieldScrubAreaProps,
} from '@base-ui/react/number-field';
import { scrubArea as scrubAreaClassName } from '@kalink-ui/seedly/components/number-field';

import { mergeClassName } from '@/utils/merge-class-name';

export function ScrubArea({ className, ...props }: NumberFieldScrubAreaProps) {
  return (
    <NumberField.ScrubArea
      {...props}
      className={mergeClassName(scrubAreaClassName, className)}
    />
  );
}
