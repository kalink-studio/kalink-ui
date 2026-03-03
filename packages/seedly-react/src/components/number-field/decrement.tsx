import {
  NumberField,
  type NumberFieldDecrementProps,
} from '@base-ui/react/number-field';
import { decrement as decrementClassName } from '@kalink-ui/seedly/components/number-field';

import { Button, type ButtonCompositionProps } from '../button';
import { mergeClassName } from '@/utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '@/utils/resolve-state-props';

type DecrementProps = Omit<NumberFieldDecrementProps, 'className' | 'render'> &
  ButtonCompositionProps & {
    className?: NumberFieldDecrementProps['className'];
    render?: NumberFieldDecrementProps['render'];
  };

export function Decrement({
  className,
  render,
  unstyled,
  variant = 'bare',
  tone = 'neutral',
  size = 'sm',
  shape,
  flow,
  loading,
  icon,
  ...props
}: DecrementProps) {
  return (
    <NumberField.Decrement
      {...props}
      render={({ children, ...decrementProps }, state) => {
        const resolvedClassName = resolveStateClassName(className, state);

        return (
          <Button
            {...decrementProps}
            unstyled={unstyled}
            variant={variant}
            tone={tone}
            size={size}
            shape={shape}
            flow={flow}
            loading={loading}
            icon={icon}
            className={
              unstyled
                ? resolvedClassName
                : mergeClassName(decrementClassName, resolvedClassName)
            }
            render={resolveStateRender(render, state)}
          />
        );
      }}
    />
  );
}
