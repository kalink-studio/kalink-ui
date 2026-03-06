import {
  DrawerPreview as Drawer,
  type DrawerCloseProps,
} from '@base-ui/react/drawer';
import { button as buttonClassName } from '@kalink-ui/seedly/components/drawer';

import { Button, type ButtonCompositionProps } from '../button';
import { mergeClassName } from '@/utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '@/utils/resolve-state-props';

type CloseProps = Omit<DrawerCloseProps, 'className' | 'render'> &
  ButtonCompositionProps & {
    className?: DrawerCloseProps['className'];
    render?: DrawerCloseProps['render'];
  };

export function Close({
  className,
  render,
  unstyled,
  variant = 'outline',
  tone = 'neutral',
  size = 'sm',
  shape,
  flow,
  loading,
  icon,
  ...props
}: CloseProps) {
  return (
    <Drawer.Close
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
