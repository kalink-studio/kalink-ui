import {
  PreviewCard,
  type PreviewCardArrowProps,
} from '@base-ui/react/preview-card';
import {
  arrow as arrowClassName,
  arrowFill as arrowFillClassName,
  arrowInnerStroke as arrowInnerStrokeClassName,
  arrowOuterStroke as arrowOuterStrokeClassName,
} from '@kalink-ui/seedly/components/preview-card';

import { FloatingArrowGraphic } from '@/components/_internal/floating-arrow-graphic';
import { mergeClassName } from '@/utils/merge-class-name';

export function Arrow({
  className,
  children,
  ...props
}: PreviewCardArrowProps) {
  return (
    <PreviewCard.Arrow
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
    </PreviewCard.Arrow>
  );
}
