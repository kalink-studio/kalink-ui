import { Toggle as BaseToggle, type ToggleProps } from '@base-ui/react/toggle';
import { button as buttonClassName } from '@kalink-ui/seedly/components/toggle';

import { mergeClassName } from '../../utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '../../utils/resolve-state-props';
import { Button, type ButtonCompositionProps } from '../button';

export type ToggleRootProps = Omit<
  ToggleProps<string>,
  'className' | 'render'
> &
  ButtonCompositionProps & {
    className?: ToggleProps<string>['className'];
    render?: ToggleProps<string>['render'];
  };

export function Toggle({
  className,
  render,
  unstyled,
  variant = 'ghost',
  tone = 'neutral',
  size = 'md',
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
