import { Menu, type MenuArrowProps } from '@base-ui/react/menu';
import {
  arrow as arrowClassName,
  arrowFill as arrowFillClassName,
  arrowInnerStroke as arrowInnerStrokeClassName,
  arrowOuterStroke as arrowOuterStrokeClassName,
} from '@kalink-ui/seedly/components/menu';

import { FloatingArrowGraphic } from '@/components/_internal/floating-arrow-graphic';
import { mergeClassName } from '@/utils/merge-class-name';

export function Arrow({ className, children, ...props }: MenuArrowProps) {
  return (
    <Menu.Arrow
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
    </Menu.Arrow>
  );
}
