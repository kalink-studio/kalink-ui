import { Tooltip, type TooltipPopupProps } from '@base-ui/react/tooltip';
import { popup as popupClassName } from '@kalink-ui/seedly/components/tooltip';

import { mergeClassName } from '../../utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '../../utils/resolve-state-props';
import { Text, type TextProps } from '../text';

type PopupProps = Omit<TooltipPopupProps, 'className' | 'render'> &
  Pick<
    TextProps,
    'align' | 'lineClamp' | 'size' | 'truncate' | 'variant' | 'wrap'
  > & {
    className?: TooltipPopupProps['className'];
    render?: TooltipPopupProps['render'];
  };

export function Popup({
  className,
  render,
  align,
  lineClamp,
  truncate,
  wrap,
  variant = 'body',
  size = 'medium',
  ...props
}: PopupProps) {
  return (
    <Tooltip.Popup
      {...props}
      render={(popupProps, state) => (
        <Text
          {...popupProps}
          align={align}
          lineClamp={lineClamp}
          truncate={truncate}
          wrap={wrap}
          variant={variant}
          size={size}
          className={mergeClassName(
            popupClassName,
            resolveStateClassName(className, state),
          )}
          render={resolveStateRender(render, state) ?? <div />}
        />
      )}
    />
  );
}
