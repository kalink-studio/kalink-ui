'use client';

import { clsx } from 'clsx';
import { Command as CommandPrimitive } from 'cmdk';
import { ComponentPropsWithRef } from 'react';

import {
  buildTypographyOverrides,
  getResponsiveBase,
  mapResponsiveSizeToTypography,
  type Responsive,
} from '../../styles';

import {
  commandGroupRecipe,
  type CommandGroupVariants,
} from './command-group.css';

export type CommandGroupProps = ComponentPropsWithRef<
  typeof CommandPrimitive.Group
> & {
  size?: Responsive<NonNullable<CommandGroupVariants['size']>>;
};

export function CommandGroup({ className, size, ...props }: CommandGroupProps) {
  const baseSize = getResponsiveBase(size) ?? 'sm';
  const typographySize = mapResponsiveSizeToTypography(size);
  const typographyOverrides = buildTypographyOverrides({
    variant: 'label',
    size: typographySize,
  });

  return (
    <CommandPrimitive.Group
      className={clsx(
        commandGroupRecipe({ size: baseSize }),
        typographyOverrides,
        className,
      )}
      {...props}
    />
  );
}
