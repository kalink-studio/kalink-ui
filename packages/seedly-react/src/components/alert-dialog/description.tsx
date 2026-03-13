import { AlertDialog } from '@base-ui/react/alert-dialog';
import { description as descriptionClassName } from '@kalink-ui/seedly/components/alert-dialog';

import { mergeClassName } from '../../utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '../../utils/resolve-state-props';
import { Text, type TextProps } from '../text';

import type { DialogDescriptionProps } from '@base-ui/react/dialog';

type DescriptionProps = Omit<DialogDescriptionProps, 'className' | 'render'> &
  Pick<
    TextProps,
    'align' | 'lineClamp' | 'size' | 'truncate' | 'variant' | 'wrap'
  > & {
    className?: DialogDescriptionProps['className'];
    render?: DialogDescriptionProps['render'];
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
    <AlertDialog.Description
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
