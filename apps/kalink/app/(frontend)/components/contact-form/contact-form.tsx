'use client';

import { isObject } from '@kalink-ui/dibbly';
import {
  Button,
  Select,
  SelectItem,
  Stack,
  TextField,
  Textarea,
} from '@kalink-ui/seedly';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  sendForm,
  type SendFormData,
} from '@/app/(frontend)/actions/send-form';
import type { CourseSessions, ContactFormField } from '@/types/cms';

import { contactFormWrapper, statusMessage } from './contact-form.css';

type FieldWithMeta = ContactFormField & {
  optionsSource?: CourseSessions | string | null;
};

export interface ContactFormProps {
  fields: FieldWithMeta[];
  type: 'message' | 'inscription';
  sessions: CourseSessions[];
}

const resolveOptions = (
  source: CourseSessions | string | null | undefined,
  sessions: CourseSessions[],
) => {
  if (isObject<CourseSessions>(source) && Array.isArray(source.items)) {
    return source.items.map((item) => ({
      label: item.label,
      value: item.value,
    }));
  }

  if (typeof source === 'string') {
    const target = sessions.find(
      (session) => session.id === source || session.slug === source,
    );
    if (target) {
      return target.items.map((item) => ({
        label: item.label,
        value: item.value,
      }));
    }
  }

  return [];
};

export function ContactForm({ fields, type, sessions }: ContactFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SendFormData>({
    defaultValues: {},
  });

  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>(
    'idle',
  );
  const [statusMessageText, setStatusMessage] = React.useState<string>('');

  const onSubmit = async (data: SendFormData) => {
    setStatus('idle');
    setStatusMessage('');

    try {
      await sendForm(data, type);
      setStatus('success');
      setStatusMessage('Votre message a bien été envoyé.');
      reset();
    } catch (error) {
      setStatus('error');
      setStatusMessage(
        error instanceof Error
          ? `Erreur : ${error.message}`
          : "Erreur : Une erreur inattendue s'est produite",
      );
    }
  };

  return (
    <form
      className={contactFormWrapper}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Stack spacing={4}>
        {fields.map((field) => {
          if (field.fieldType === 'select') {
            const options = resolveOptions(
              field.optionsSource ?? null,
              sessions,
            );

            return (
              <Controller
                key={field.id}
                control={control}
                name={field.fieldName}
                rules={{
                  required: field.required
                    ? 'Merci de sélectionner une option'
                    : undefined,
                }}
                defaultValue={''}
                render={({ field: controllerField, fieldState }) => (
                  <Select
                    label={field.fieldLabel}
                    name={field.fieldName}
                    required={field.required}
                    placeholder="Sélectionnez une option"
                    errors={fieldState.error?.message ?? ''}
                    value={controllerField.value ?? ''}
                    onValueChange={controllerField.onChange}
                  >
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            );
          }

          return (
            <Controller
              key={field.id}
              control={control}
              name={field.fieldName}
              rules={{
                required: field.required
                  ? 'Merci de renseigner ce champ'
                  : undefined,
              }}
              defaultValue={''}
              render={({ field: controllerField, fieldState }) =>
                field.fieldType === 'textarea' ? (
                  <Textarea
                    label={field.fieldLabel}
                    name={field.fieldName}
                    required={field.required}
                    errors={fieldState.error?.message ?? ''}
                    rows={5}
                    value={controllerField.value ?? ''}
                    onChange={controllerField.onChange}
                    onBlur={controllerField.onBlur}
                  />
                ) : (
                  <TextField
                    label={field.fieldLabel}
                    name={field.fieldName}
                    required={field.required}
                    errors={fieldState.error?.message ?? ''}
                    value={controllerField.value ?? ''}
                    onChange={controllerField.onChange}
                    onBlur={controllerField.onBlur}
                  />
                )
              }
            />
          );
        })}
        <Button type="submit" variant="plain" disabled={isSubmitting}>
          {isSubmitting ? 'Envoi…' : 'Envoyer'}
        </Button>
      </Stack>
      {status !== 'idle' ? (
        <div className={statusMessage} role="status" aria-live="polite">
          {statusMessageText}
        </div>
      ) : null}
    </form>
  );
}
