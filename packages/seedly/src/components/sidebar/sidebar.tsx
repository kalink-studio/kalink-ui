'use client';

import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ElementType } from 'react';

import { SidebarVariants, sidebarVars } from './sidebar.css';
import { sidebarResponsive } from './sidebar.responsive';

import type { Responsive } from '../../styles/responsive';

type SidebarProps<TUse extends ElementType> = PolymorphicComponentProps<TUse> &
  Omit<SidebarVariants, 'sideWidth' | 'spacing'> & {
    /**
     * The size of the side element
     */
    sideWidth?: string;

    /**
     * The narrowest the content (main) element can be before wrapping.
     * Should be a percentage.
     */
    contentMinWidth?: string;
    spacing?: Responsive<NonNullable<SidebarVariants['spacing']>>;
  };

/**
 * A custom element for placing two elements side-by-side. If space permits,
 * the sided element has a set width, and the companion takes up the rest
 * of the available horizontal space. If not, the elements are collapsed into
 * a single column, each taking up 100% of the horizontal space.
 *
 * https://every-layout.dev/layouts/sidebar/
 */
export function Sidebar<TUse extends ElementType>({
  side = 'left',
  sideWidth,
  contentMinWidth,
  spacing,
  noStretch,
  className,
  ...props
}: SidebarProps<TUse>) {
  const { use: Comp = 'div', ...rest } = props;

  return (
    <Comp
      className={sidebarResponsive(
        { side, sideWidth: !!sideWidth, spacing, noStretch },
        className,
      )}
      style={assignInlineVars({
        ...(sideWidth && { [sidebarVars.layout.sideWidth]: sideWidth }),
        ...(contentMinWidth && {
          [sidebarVars.layout.contentMinWidth]: contentMinWidth,
        }),
      })}
      {...rest}
    />
  );
}
