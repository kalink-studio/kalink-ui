import {
  Collapsible,
  type CollapsibleTriggerProps,
} from '@base-ui/react/collapsible';
import { trigger as triggerClassName } from '@kalink-ui/seedly/components/collapsible';

import { mergeClassName } from '../../utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '../../utils/resolve-state-props';
import { Button, type ButtonCompositionProps } from '../button';

type TriggerProps = Omit<CollapsibleTriggerProps, 'className' | 'render'> &
  ButtonCompositionProps & {
    className?: CollapsibleTriggerProps['className'];
    render?: CollapsibleTriggerProps['render'];
  };

export function Trigger({
  className,
  render,
  unstyled,
  variant = 'bare',
  tone = 'neutral',
  size = 'md',
  shape,
  flow,
  loading,
  icon,
  ...props
}: TriggerProps) {
  return (
    <Collapsible.Trigger
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
                : mergeClassName(triggerClassName, resolvedClassName)
            }
            render={resolveStateRender(render, state)}
          />
        );
      }}
    />
  );
}
