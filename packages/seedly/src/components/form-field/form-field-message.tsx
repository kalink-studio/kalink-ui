'use client';

import { clsx } from 'clsx';
import { HTMLAttributes, useEffect } from 'react';

import {
  buildTypographyOverrides,
  getResponsiveBase,
  mapResponsiveSizeToTypography,
  type Responsive,
} from '../../styles';

import { useFormFieldContext } from './form-field-context';
import {
  formFieldMessageRecipe,
  type FormFieldMessageVariants,
} from './form-field.css';

export type FormFieldMessageProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  error?: boolean;
  size?: Responsive<NonNullable<FormFieldMessageVariants['size']>>;
};

export function FormFieldMessage({
  className,
  children,
  id,
  error,
  size,
  ...props
}: FormFieldMessageProps) {
  const { registerMessageId, unRegisterMessageId, tone, errors } =
    useFormFieldContext();

  useEffect(() => {
    registerMessageId(id);

    return () => unRegisterMessageId(id);
  }, [id, registerMessageId, unRegisterMessageId]);

  const messageColor = error || errors ? 'destructive' : tone;
  const baseSize = getResponsiveBase(size) ?? 'sm';
  const typographySize = mapResponsiveSizeToTypography(size);
  const typographyOverrides = buildTypographyOverrides({
    variant: 'body',
    size: typographySize,
  });

  return (
    <div
      id={id}
      className={clsx(
        formFieldMessageRecipe({ size: baseSize }),
        typographyOverrides,
        className,
      )}
      data-tone={messageColor}
      {...props}
    >
      {children}
    </div>
  );
}
