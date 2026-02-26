import { Dialog, type DialogCloseProps } from '@base-ui/react/dialog';
import { button as buttonClassName } from '@kalink-ui/seedly/components/dialog';

import { Button, type ButtonCompositionProps } from '../button';
import { mergeClassName } from '@/utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '@/utils/resolve-state-props';

type CloseProps = Omit<DialogCloseProps, 'className' | 'render'> &
  ButtonCompositionProps & {
    className?: DialogCloseProps['className'];
    render?: DialogCloseProps['render'];
  };

export function Close({
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
}: CloseProps) {
  return (
    <Dialog.Close
      {...props}
      render={(closeProps, state) => {
        const resolvedClassName = resolveStateClassName(className, state);

        return (
          <Button
            {...closeProps}
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
