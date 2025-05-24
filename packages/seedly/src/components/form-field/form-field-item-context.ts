'use client';

import { createRequiredContext } from '@kalink-ui/dibbly';

export const [useFormFieldItemContext, FormFieldItemContextProvider] =
  createRequiredContext<{ id: string }>();
