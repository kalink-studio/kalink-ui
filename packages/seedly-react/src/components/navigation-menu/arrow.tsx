import {
  NavigationMenu,
  type NavigationMenuArrowProps,
} from '@base-ui/react/navigation-menu';
import {
  arrow as arrowClassName,
  arrowFill as arrowFillClassName,
  arrowInnerStroke as arrowInnerStrokeClassName,
  arrowOuterStroke as arrowOuterStrokeClassName,
} from '@kalink-ui/seedly/components/navigation-menu';

import { mergeClassName } from '../../utils/merge-class-name';
import { FloatingArrowGraphic } from '../_internal/floating-arrow-graphic';

export function Arrow({
  className,
  children,
  ...props
}: NavigationMenuArrowProps) {
  return (
    <NavigationMenu.Arrow
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
    </NavigationMenu.Arrow>
  );
}
