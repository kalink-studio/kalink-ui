import { clsx } from 'clsx';
import {
  ComponentPropsWithRef,
  ForwardedRef,
  MouseEventHandler,
  ReactNode,
  RefObject,
  useCallback,
} from 'react';

import {
  inputAppearance,
  InputAppearanceVariants,
  inputWrapper,
} from './input.css';

export type InputWrapperProps = ComponentPropsWithRef<'div'> & {
  children: ReactNode;
  className?: string;
  inputRef: RefObject<HTMLInputElement | null>;
  disabled?: boolean;
} & InputAppearanceVariants;

export function InputWrapper({
  children,
  className,
  inputRef,
  disabled,
  variant = 'outlined',
  size = 'md',
  ref,
}: InputWrapperProps) {
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
      className={clsx(
        inputAppearance({ variant, size }),
        inputWrapper,
        className,
      )}
      onClick={handleInputFocus}
    >
      {children}
    </div>
  );
}
