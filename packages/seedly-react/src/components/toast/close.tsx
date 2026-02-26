import { Toast, type ToastCloseProps } from '@base-ui/react/toast';
import { close as closeClassName } from '@kalink-ui/seedly/components/toast';

import { Button, type ButtonCompositionProps } from '../button';
import { mergeClassName } from '@/utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '@/utils/resolve-state-props';

import type { ReactNode } from 'react';

type CloseProps = Omit<ToastCloseProps, 'children' | 'className' | 'render'> &
  ButtonCompositionProps & {
    children?: ReactNode;
    className?: ToastCloseProps['className'];
    render?: ToastCloseProps['render'];
  };

export function Close({
  className,
  render,
  unstyled,
  variant = 'bare',
  tone = 'neutral',
  size = 'sm',
  shape,
  flow,
  loading,
  icon,
  children,
  ...props
}: CloseProps) {
  return (
    <Toast.Close
      {...props}
      render={(closeProps, state) => {
        const resolvedClassName = resolveStateClassName(className, state);
        const iconContent =
          icon ??
          (children as
            | Exclude<ButtonCompositionProps['icon'], undefined>
            | undefined);

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
            icon={iconContent}
            className={
              unstyled
                ? resolvedClassName
                : mergeClassName(closeClassName, resolvedClassName)
            }
            render={resolveStateRender(render, state)}
          />
        );
      }}
    />
  );
}
