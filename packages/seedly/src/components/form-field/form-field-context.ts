'use client';

import { createRequiredContext } from '@kalink-ui/dibbly';

interface FormFieldContext {
  name: string;
  registerMessageId: (id: string) => void;
  unRegisterMessageId: (id: string) => void;
  messageIds: string[];
  errors?: string | null;
  hideErrorMessage: boolean;
  label: string;
  disabled?: boolean;
  hideLabel: boolean;
}

export const [useFormFieldContext, FormFieldContextProvider] =
  createRequiredContext<FormFieldContext>();
