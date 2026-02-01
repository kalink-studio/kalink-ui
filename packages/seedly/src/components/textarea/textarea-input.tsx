import { TextareaHTMLAttributes } from 'react';

import {
  buildTypographyOverrides,
  mapResponsiveSizeToTypography,
  type Responsive,
} from '../../styles';
import { useFormFieldContext } from '../form-field/form-field-context';
import { type InputAppearanceVariants } from '../input';
import { inputAppearanceResponsive } from '../input/input.responsive';
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
  tone,
  ...props
}: TextareaInputProps) {
  const { errors, tone: contextTone } = useFormFieldContext();
  const resolvedTone = tone ?? contextTone;
  const typographySize = mapResponsiveSizeToTypography(size);
  const typographyOverrides = buildTypographyOverrides({
    variant: 'body',
    size: typographySize,
  });

  return (
    <textarea
      className={inputAppearanceResponsive(
        { variant, size, tone: resolvedTone },
        typographyOverrides,
        textarea,
        className,
      )}
      aria-invalid={errors ? 'true' : undefined}
      {...props}
    />
  );
}
