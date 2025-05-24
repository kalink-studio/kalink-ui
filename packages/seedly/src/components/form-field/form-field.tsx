'use client';

import { useState, useCallback, ReactNode } from 'react';

import { FormFieldContextProvider } from './form-field-context';

export interface FormFieldProps {
  name: string;
  label: string;
  children: ReactNode;
  errors?: string | null;
  hideErrorMessage: boolean;
  hideLabel: boolean;
  disabled?: boolean;
}

export function FormField({
  name,
  label,
  children,
  errors,
  hideErrorMessage = false,
  hideLabel = false,
  disabled,
}: FormFieldProps) {
  const [messageIds, setMessageIds] = useState<string[]>([]);

  const registerMessageId = useCallback(
    (id: string) => setMessageIds((ids) => [...new Set([...ids, id])]),
    [setMessageIds],
  );

  const unRegisterMessageId = useCallback(
    (id: string) =>
      setMessageIds((ids) => ids.filter((current) => current !== id)),
    [setMessageIds],
  );

  return (
    <FormFieldContextProvider
      value={{
        name,
        registerMessageId,
        unRegisterMessageId,
        messageIds,
        errors,
        hideErrorMessage,
        label,
        disabled,
        hideLabel,
      }}
    >
      {children}
    </FormFieldContextProvider>
  );
}
