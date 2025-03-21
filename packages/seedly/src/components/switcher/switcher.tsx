'use client';

import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { switcherRecipe, SwitcherVariants, thresholdVar } from './switcher.css';

type SwitcherProps<TUse extends ElementType> = PolymorphicComponentProps<TUse> &
  SwitcherVariants & {
    /**
     * The threshold at which to switch between horizontal and vertical layouts
     */
    threshold?: string;
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
      className={clsx(switcherRecipe({ spacing, limit }), className)}
      style={assignInlineVars({
        ...(threshold && { [thresholdVar]: threshold }),
      })}
      {...props}
    />
  );
}
