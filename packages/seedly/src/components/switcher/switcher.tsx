'use client';

import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ElementType } from 'react';

import { SwitcherVariants, switcherVars } from './switcher.css';
import { switcherResponsive } from './switcher.responsive';

import type { Responsive } from '../../styles/responsive';

export type SwitcherProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> &
    Omit<SwitcherVariants, 'spacing' | 'limit'> & {
      /**
       * The threshold at which to switch between horizontal and vertical layouts
       */
      threshold?: string;
      spacing?: Responsive<NonNullable<SwitcherVariants['spacing']>>;
      limit?: Responsive<NonNullable<SwitcherVariants['limit']>>;
    };

/**
 * Switch directly between horizontal and vertical layouts
 * at a given (container width-based) breakpoint or 'threshold'
 *
 * https://every-layout.dev/layouts/switcher
 */
export function Switcher<TUse extends ElementType>({
  spacing,
  threshold,
  limit,
  className,
  ...props
}: SwitcherProps<TUse>) {
  const { use: Comp = 'div' } = props;

  return (
    <Comp
      className={switcherResponsive({ spacing, limit }, className)}
      style={assignInlineVars({
        ...(threshold && { [switcherVars.layout.threshold]: threshold }),
      })}
      {...props}
    />
  );
}
