import {
  ComponentPropsWithRef,
  ForwardedRef,
  MouseEventHandler,
  ReactNode,
  RefObject,
  useCallback,
} from 'react';

import {
  buildTypographyOverrides,
  mapResponsiveSizeToTypography,
  type Responsive,
} from '../../styles';

import { InputAppearanceVariants, inputWrapper } from './input.css';
import { inputAppearanceResponsive } from './input.responsive';

export type InputWrapperProps = ComponentPropsWithRef<'div'> & {
  children: ReactNode;
  className?: string;
  inputRef: RefObject<HTMLInputElement | null>;
  disabled?: boolean;
} & Omit<InputAppearanceVariants, 'size'> & {
    size?: Responsive<NonNullable<InputAppearanceVariants['size']>>;
  };

export function InputWrapper({
  children,
  className,
  inputRef,
  disabled,
  variant = 'outlined',
  size = 'md',
  tone = 'neutral',
  ref,
}: InputWrapperProps) {
  const typographySize = mapResponsiveSizeToTypography(size);
  const typographyOverrides = buildTypographyOverrides({
    variant: 'body',
    size: typographySize,
  });

  const handleInputFocus = useCallback<MouseEventHandler<HTMLElement>>(
    (e) => {
      if (disabled || !inputRef?.current || e.target === inputRef.current) {
        return;
      }

      inputRef.current.click();
      inputRef.current.focus();
    },
    [inputRef, disabled],
  );

  return (
    <div
      ref={ref as ForwardedRef<HTMLDivElement>}
      className={inputAppearanceResponsive(
        { variant, size, tone },
        typographyOverrides,
        inputWrapper,
        className,
      )}
      onClick={handleInputFocus}
    >
      {children}
    </div>
  );
}
