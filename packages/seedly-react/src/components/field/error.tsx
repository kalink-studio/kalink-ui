import { Field, type FieldErrorProps } from '@base-ui/react/field';
import { error as errorClassName } from '@kalink-ui/seedly/components/field';

import { Text, type TextProps } from '../text';
import { mergeClassName } from '@/utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '@/utils/resolve-state-props';

type ErrorProps = Omit<FieldErrorProps, 'className' | 'render'> &
  Pick<
    TextProps,
    'align' | 'lineClamp' | 'size' | 'truncate' | 'variant' | 'wrap'
  > & {
    className?: FieldErrorProps['className'];
    render?: FieldErrorProps['render'];
  };

export function Error({
  className,
  render,
  align,
  lineClamp,
  truncate,
  wrap,
  variant = 'body',
  size = 'medium',
  ...props
}: ErrorProps) {
  return (
    <Field.Error
      {...props}
      render={(errorProps, state) => (
        <Text
          {...errorProps}
          align={align}
          lineClamp={lineClamp}
          truncate={truncate}
          wrap={wrap}
          variant={variant}
          size={size}
          className={mergeClassName(
            errorClassName,
            resolveStateClassName(className, state),
          )}
          render={resolveStateRender(render, state) ?? <p />}
        />
      )}
    />
  );
}
