import { Toggle as BaseToggle, type ToggleProps } from '@base-ui/react/toggle';
import { button as buttonClassName } from '@kalink-ui/seedly/components/toggle';

import { Button, type ButtonCompositionProps } from '../button';
import { mergeClassName } from '@/utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '@/utils/resolve-state-props';

export type ToggleRootProps = Omit<ToggleProps, 'className' | 'render'> &
  ButtonCompositionProps & {
    className?: ToggleProps['className'];
    render?: ToggleProps['render'];
  };

export function Toggle({
  className,
  render,
  unstyled,
  variant = 'ghost',
  tone = 'neutral',
  size = 'sm',
  shape,
  flow,
  loading,
  icon,
  ...props
}: ToggleRootProps) {
  return (
    <BaseToggle
      {...props}
      render={(toggleProps, state) => {
        const resolvedClassName = resolveStateClassName(className, state);

        return (
          <Button
            {...toggleProps}
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
                : mergeClassName(buttonClassName, resolvedClassName)
            }
            render={resolveStateRender(render, state)}
          />
        );
      }}
    />
  );
}
