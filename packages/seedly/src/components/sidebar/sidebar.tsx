'use client';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { PolymorphicComponentProps } from '../../types/utils.types';

import {
  contentMinWidthVar,
  sidebarRecipe,
  SidebarVariants,
  sideWidthVar,
} from './sidebar.css';

type SidebarProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> & {
    /**
     * The size of the side element
     */
    sideWidth?: string;

    /**
     * The narrowest the content (main) element can be before wrapping.
     * Should be a percentage.
     */
    contentMinWidth?: string;

    /**
     * The side of the sidebar
     */
    side?: SidebarVariants['side'];

    /**
     * The spacing between the sidebar and main content elements
     */
    spacing?: SidebarVariants['spacing'];

    /**
     * Whether the sidebar should stretch to fill the available space
     */
    noStretch?: SidebarVariants['noStretch'];
  };

/**
 * A custom element for placing two elements side-by-side. If space permits,
 * the sided element has a set width, and the companion takes up the rest
 * of the available horizontal space. If not, the elements are collapsed into
 * a single column, each taking up 100% of the horizontal space.
 *
 * https://every-layout.dev/layouts/sidebar/
 */
export const Sidebar = <TUse extends ElementType>({
  side = 'left',
  sideWidth,
  contentMinWidth,
  spacing,
  noStretch,
  className,
  ...props
}: SidebarProps<TUse>) => {
  const { use: Comp = 'div', ...rest } = props;

  return (
    <Comp
      className={clsx(
        sidebarRecipe({ side, sideWidth: !!sideWidth, spacing, noStretch }),
        className,
      )}
      style={assignInlineVars({
        ...(sideWidth && { [sideWidthVar]: sideWidth }),
        ...(contentMinWidth && { [contentMinWidthVar]: contentMinWidth }),
      })}
      {...rest}
    />
  );
};
