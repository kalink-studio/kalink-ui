import {
  NumberField,
  type NumberFieldScrubAreaCursorProps,
} from '@base-ui/react/number-field';
import { scrubAreaCursor as scrubAreaCursorClassName } from '@kalink-ui/seedly/components/number-field';

import { mergeClassName } from '../../utils/merge-class-name';

export function ScrubAreaCursor({
  className,
  ...props
}: NumberFieldScrubAreaCursorProps) {
  return (
    <NumberField.ScrubAreaCursor
      {...props}
      className={mergeClassName(scrubAreaCursorClassName, className)}
    />
  );
}
