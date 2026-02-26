import {
  NavigationMenu,
  type NavigationMenuTriggerProps,
} from '@base-ui/react/navigation-menu';
import { trigger as triggerClassName } from '@kalink-ui/seedly/components/navigation-menu';

import { Button, type ButtonCompositionProps } from '../button';
import { mergeClassName } from '@/utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '@/utils/resolve-state-props';

type TriggerProps = Omit<NavigationMenuTriggerProps, 'className' | 'render'> &
  ButtonCompositionProps & {
    className?: NavigationMenuTriggerProps['className'];
    render?: NavigationMenuTriggerProps['render'];
  };

export function Trigger({
  className,
  render,
  unstyled,
  variant = 'ghost',
  tone = 'neutral',
  size = 'lg',
  shape,
  flow,
  loading,
  icon,
  ...props
}: TriggerProps) {
  return (
    <NavigationMenu.Trigger
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
