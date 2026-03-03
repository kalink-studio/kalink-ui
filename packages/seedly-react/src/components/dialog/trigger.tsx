import { Dialog, type DialogTriggerProps } from '@base-ui/react/dialog';
import { button as buttonClassName } from '@kalink-ui/seedly/components/dialog';

import { Button, type ButtonCompositionProps } from '../button';
import { mergeClassName } from '@/utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '@/utils/resolve-state-props';

type TriggerProps = Omit<DialogTriggerProps, 'className' | 'render'> &
  ButtonCompositionProps & {
    className?: DialogTriggerProps['className'];
    render?: DialogTriggerProps['render'];
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
    <Dialog.Trigger
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
