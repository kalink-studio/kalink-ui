import { Tooltip, type TooltipTriggerProps } from '@base-ui/react/tooltip';
import { button as buttonClassName } from '@kalink-ui/seedly/components/tooltip';

import { Button, type ButtonCompositionProps } from '../button';
import { mergeClassName } from '@/utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '@/utils/resolve-state-props';

type TriggerProps = Omit<TooltipTriggerProps, 'className' | 'render'> &
  ButtonCompositionProps & {
    className?: TooltipTriggerProps['className'];
    render?: TooltipTriggerProps['render'];
  };

export function Trigger({
  className,
  render,
  unstyled,
  variant = 'ghost',
  tone = 'neutral',
  size = 'md',
  shape = 'small',
  flow,
  loading,
  icon,
  ...props
}: TriggerProps) {
  return (
    <Tooltip.Trigger
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
                : mergeClassName(buttonClassName, resolvedClassName)
            }
            render={resolveStateRender(render, state)}
          />
        );
      }}
    />
  );
}
