import { Popover, type PopoverArrowProps } from '@base-ui/react/popover';
import {
  arrow as arrowClassName,
  arrowFill as arrowFillClassName,
  arrowInnerStroke as arrowInnerStrokeClassName,
  arrowOuterStroke as arrowOuterStrokeClassName,
} from '@kalink-ui/seedly/components/popover';

import { mergeClassName } from '../../utils/merge-class-name';
import { FloatingArrowGraphic } from '../_internal/floating-arrow-graphic';

export function Arrow({ className, children, ...props }: PopoverArrowProps) {
  return (
    <Popover.Arrow
      {...props}
      className={mergeClassName(arrowClassName, className)}
    >
      {children ?? (
        <FloatingArrowGraphic
          fillClassName={arrowFillClassName}
          outerStrokeClassName={arrowOuterStrokeClassName}
          innerStrokeClassName={arrowInnerStrokeClassName}
        />
      )}
    </Popover.Arrow>
  );
}
