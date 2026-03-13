import { Tooltip, type TooltipArrowProps } from '@base-ui/react/tooltip';
import {
  arrow as arrowClassName,
  arrowFill as arrowFillClassName,
  arrowInnerStroke as arrowInnerStrokeClassName,
  arrowOuterStroke as arrowOuterStrokeClassName,
} from '@kalink-ui/seedly/components/tooltip';

import { mergeClassName } from '../../utils/merge-class-name';
import { FloatingArrowGraphic } from '../_internal/floating-arrow-graphic';

export function Arrow({ className, children, ...props }: TooltipArrowProps) {
  return (
    <Tooltip.Arrow
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
    </Tooltip.Arrow>
  );
}
