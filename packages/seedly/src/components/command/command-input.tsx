'use client';

import { mergeRefs } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { Command as CommandPrimitive } from 'cmdk';
import { ComponentPropsWithRef, ReactNode, useRef } from 'react';

import { InputWrapper } from '../input/input-wrapper';
import { input } from '../input/input.css';

import { commandInputWrapper } from './command-input.css';

export type CommandInputProps = ComponentPropsWithRef<
  typeof CommandPrimitive.Input
> & {
  icon?: ReactNode;
};

export function CommandInput({
  className,
  disabled,
  ref,
  icon,
  ...props
}: CommandInputProps) {
  const innerRef = useRef<HTMLInputElement>(null);

  return (
    <InputWrapper
      inputRef={innerRef}
      disabled={disabled}
      variant="bare"
      className={commandInputWrapper}
    >
      {icon}
      <CommandPrimitive.Input
        ref={mergeRefs([ref, innerRef])}
        className={clsx(input, className)}
        disabled={disabled}
        {...props}
      />
    </InputWrapper>
  );
}
