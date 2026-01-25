import { clsx } from 'clsx';
import { ComponentPropsWithRef } from 'react';

import {
  buildTypographyOverrides,
  getResponsiveBase,
  mapResponsiveSizeToTypography,
  type Responsive,
} from '../../styles';

import { label, LabelVariants } from './label.css';

export type LabelProps = ComponentPropsWithRef<'label'> & {
  required?: boolean;
} & Omit<LabelVariants, 'size'> & {
    size?: Responsive<NonNullable<LabelVariants['size']>>;
  };

export function Label({
  className,
  disabled,
  error,
  size = 'md',
  ...props
}: LabelProps) {
  const baseSize = getResponsiveBase(size) ?? 'md';
  const typographySize = mapResponsiveSizeToTypography(size);
  const typographyOverrides = buildTypographyOverrides({
    variant: 'label',
    size: typographySize,
  });

  return (
    <label
      className={clsx(
        label({ disabled, error, size: baseSize }),
        typographyOverrides,
        className,
      )}
      {...props}
    />
  );
}
