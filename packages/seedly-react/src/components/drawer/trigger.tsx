import {
  DrawerPreview as Drawer,
  type DrawerTriggerProps,
} from '@base-ui/react/drawer';
import { button as buttonClassName } from '@kalink-ui/seedly/components/drawer';

import { mergeClassName } from '../../utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '../../utils/resolve-state-props';
import { Button, type ButtonCompositionProps } from '../button';

type TriggerProps = Omit<DrawerTriggerProps, 'className' | 'render'> &
  ButtonCompositionProps & {
    className?: DrawerTriggerProps['className'];
    render?: DrawerTriggerProps['render'];
  };

export function Trigger({
  className,
  render,
  unstyled,
  variant = 'outline',
  tone = 'neutral',
  size = 'md',
  shape,
  flow,
  loading,
  icon,
  ...props
}: TriggerProps) {
  return (
    <Drawer.Trigger
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
