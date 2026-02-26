import { type MenuTriggerProps } from '@base-ui/react/menu';
import { menuTrigger as menuTriggerClassName } from '@kalink-ui/seedly/components/menubar';

import { Button, type ButtonCompositionProps } from '../button';
import { Menu } from '../menu';
import { mergeClassName } from '@/utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '@/utils/resolve-state-props';

type TriggerProps = Omit<MenuTriggerProps, 'className' | 'render'> &
  ButtonCompositionProps & {
    className?: MenuTriggerProps['className'];
    render?: MenuTriggerProps['render'];
  };

export function Trigger({
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
}: TriggerProps) {
  return (
    <Menu.Trigger
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
                : mergeClassName(menuTriggerClassName, resolvedClassName)
            }
            render={resolveStateRender(render, state)}
          />
        );
      }}
    />
  );
}
