'use client';

import { Root } from '@radix-ui/react-select';
import { ComponentPropsWithRef } from 'react';

import { useFormFieldContext } from '../form-field';

export type SelectRootProps = ComponentPropsWithRef<typeof Root>;

export function SelectRoot(props: SelectRootProps) {
  const { name } = useFormFieldContext();

  return <Root name={name} {...props} />;
}
