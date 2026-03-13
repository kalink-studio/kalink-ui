import {
  NumberField,
  type NumberFieldIncrementProps,
} from '@base-ui/react/number-field';
import { increment as incrementClassName } from '@kalink-ui/seedly/components/number-field';

import { mergeClassName } from '../../utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '../../utils/resolve-state-props';
import { Button, type ButtonCompositionProps } from '../button';

type IncrementProps = Omit<NumberFieldIncrementProps, 'className' | 'render'> &
  ButtonCompositionProps & {
    className?: NumberFieldIncrementProps['className'];
    render?: NumberFieldIncrementProps['render'];
  };

export function Increment({
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
}: IncrementProps) {
  return (
    <NumberField.Increment
      {...props}
      render={(incrementProps, state) => {
        const resolvedClassName = resolveStateClassName(className, state);

        return (
          <Button
            {...incrementProps}
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
                : mergeClassName(incrementClassName, resolvedClassName)
            }
            render={resolveStateRender(render, state)}
          />
        );
      }}
    />
  );
}
