import {
  NavigationMenu,
  type NavigationMenuLinkProps,
} from '@base-ui/react/navigation-menu';
import { linkCard } from '@kalink-ui/seedly/components/navigation-menu';

import { Button, type ButtonCompositionProps } from '../button';
import { mergeClassName } from '@/utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '@/utils/resolve-state-props';

export type LinkProps = Omit<NavigationMenuLinkProps, 'className' | 'render'> &
  ButtonCompositionProps & {
    className?: NavigationMenuLinkProps['className'];
    render?: NavigationMenuLinkProps['render'];
  };

export function Link({
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
}: LinkProps) {
  return (
    <NavigationMenu.Link
      {...props}
      render={(linkProps, state) => {
        const resolvedClassName = resolveStateClassName(className, state);

        return (
          <Button
            {...linkProps}
            nativeButton={false}
            unstyled={unstyled}
            variant={variant}
            tone={tone}
            size={size}
            shape={shape}
            flow={flow}
            loading={loading}
            icon={icon}
            className={mergeClassName(linkCard, resolvedClassName)}
            render={resolveStateRender(render, state) ?? <a />}
          />
        );
      }}
    />
  );
}
