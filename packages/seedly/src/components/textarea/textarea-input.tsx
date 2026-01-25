import { clsx } from 'clsx';
import { TextareaHTMLAttributes } from 'react';

import {
  buildTypographyOverrides,
  getResponsiveBase,
  mapResponsiveSizeToTypography,
  type Responsive,
} from '../../styles';
import { useFormFieldContext } from '../form-field/form-field-context';
import { inputAppearance, type InputAppearanceVariants } from '../input';
import { textarea } from '../textarea/textarea.css';

export type TextareaInputProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
> &
  Omit<InputAppearanceVariants, 'size'> & {
    size?: Responsive<NonNullable<InputAppearanceVariants['size']>>;
  };

export function TextareaInput({
  className,
  size = 'md',
  variant = 'outlined',
  tone = 'neutral',
  ...props
}: TextareaInputProps) {
  const { errors } = useFormFieldContext();
  const baseSize = getResponsiveBase(size) ?? 'md';
  const typographySize = mapResponsiveSizeToTypography(size);
  const typographyOverrides = buildTypographyOverrides({
    variant: 'body',
    size: typographySize,
  });

  return (
    <textarea
      className={clsx(
        inputAppearance({ variant, size: baseSize, tone }),
        typographyOverrides,
        textarea,
        className,
      )}
      aria-invalid={errors ? 'true' : undefined}
      {...props}
    />
  );
}
