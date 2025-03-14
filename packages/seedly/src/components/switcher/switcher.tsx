'use client';

import { PolymorphicComponentProps } from '@kalink-ui/dibbly/types';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { switcherRecipe, SwitcherVariants, thresholdVar } from './switcher.css';

type SwitcherProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> & {
    /**
     * The gap between items
     */
    spacing?: SwitcherVariants['spacing'];

    /**
     * The threshold at which to switch between horizontal and vertical layouts
     */
    threshold?: string;

    /**
     * The maximum number of elements allowed to appear in the horizontal configuration
     */
    limit?: SwitcherVariants['limit'];
  };

/**
 * Switch directly between horizontal and vertical layouts
 * at a given (container width-based) breakpoint or 'threshold'
 *
 * https://every-layout.dev/layouts/switcher
 */
export const Switcher = <TUse extends ElementType>({
  spacing,
  threshold,
  limit,
  className,
  ...props
}: SwitcherProps<TUse>) => {
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
};
