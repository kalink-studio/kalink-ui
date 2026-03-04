import { Toast, type ToastDescriptionProps } from '@base-ui/react/toast';
import { description as descriptionClassName } from '@kalink-ui/seedly/components/toast';

import { Text, type TextProps } from '../text';
import { mergeClassName } from '@/utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '@/utils/resolve-state-props';

type DescriptionProps = Omit<ToastDescriptionProps, 'className' | 'render'> &
  Pick<
    TextProps,
    'align' | 'lineClamp' | 'size' | 'truncate' | 'variant' | 'wrap'
  > & {
    className?: ToastDescriptionProps['className'];
    render?: ToastDescriptionProps['render'];
  };

export function Description({
  className,
  render,
  align,
  lineClamp,
  truncate,
  wrap,
  variant = 'body',
  size = 'medium',
  ...props
}: DescriptionProps) {
  return (
    <Toast.Description
      {...props}
      render={(descriptionProps, state) => (
        <Text
          {...descriptionProps}
          align={align}
          lineClamp={lineClamp}
          truncate={truncate}
          wrap={wrap}
          variant={variant}
          size={size}
          className={mergeClassName(
            descriptionClassName,
            resolveStateClassName(className, state),
          )}
          render={resolveStateRender(render, state) ?? <p />}
        />
      )}
    />
  );
}
