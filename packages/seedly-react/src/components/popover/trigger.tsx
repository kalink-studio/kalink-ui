import { Popover, type PopoverTriggerProps } from '@base-ui/react/popover';
import { iconButton as iconButtonClassName } from '@kalink-ui/seedly/components/popover';

import { Button, type ButtonCompositionProps } from '../button';
import { mergeClassName } from '@/utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '@/utils/resolve-state-props';

type TriggerProps = Omit<PopoverTriggerProps, 'className' | 'render'> &
  ButtonCompositionProps & {
    className?: PopoverTriggerProps['className'];
    render?: PopoverTriggerProps['render'];
  };

export function Trigger({
  className,
  render,
  unstyled,
  variant = 'outline',
  tone = 'neutral',
  size = 'lg',
  shape,
  flow,
  loading,
  icon,
  ...props
}: TriggerProps) {
  return (
    <Popover.Trigger
      {...props}
      render={(triggerProps, state) => {
        const resolvedClassName = resolveStateClassName(className, state);

        return (
          <Button
            {...triggerProps}
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
                : mergeClassName(iconButtonClassName, resolvedClassName)
            }
            render={resolveStateRender(render, state)}
          />
        );
      }}
    />
  );
}
