import { useRender } from '@base-ui/react/use-render';
import {
  sidebarResponsive,
  sidebarVars,
  type SidebarVariants,
} from '@kalink-ui/seedly/components/sidebar';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import { mergeClassName } from '@/utils/merge-class-name';

export type SidebarProps = useRender.ComponentProps<'div'> &
  Omit<SidebarVariants, 'sideWidth' | 'spacing'> & {
    sideWidth?: string;
    contentMinWidth?: string;
    spacing?: NonNullable<SidebarVariants['spacing']>;
  };

export function Sidebar({
  side = 'left',
  sideWidth,
  contentMinWidth,
  spacing,
  noStretch,
  className,
  render,
  ...props
}: SidebarProps) {
  const style =
    sideWidth == null && contentMinWidth == null
      ? props.style
      : {
          ...props.style,
          ...assignInlineVars({
            ...(sideWidth != null
              ? { [sidebarVars.layout.sideWidth]: sideWidth }
              : {}),
            ...(contentMinWidth != null
              ? { [sidebarVars.layout.contentMinWidth]: contentMinWidth }
              : {}),
          }),
        };

  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      style,
      className: mergeClassName(
        sidebarResponsive({
          side,
          sideWidth: sideWidth != null,
          spacing,
          noStretch,
        }),
        className,
      ),
    },
  });
}
