'use client';

import { createRequiredContext } from '@kalink-ui/dibbly';

import type { Tone } from '../../styles';

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
  tone?: Tone;
}

export const [useFormFieldContext, FormFieldContextProvider] =
  createRequiredContext<FormFieldContext>();
