'use client';

import { isObject } from '@kalink-ui/dibbly';
import { Button, Field, Select, Stack } from '@kalink-ui/seedly-react';
import { ChevronDown } from 'lucide-react';
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

interface FormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function ContactField({
  label,
  name,
  required,
  error,
  children,
}: FormFieldProps) {
  return (
    <Field.Root name={name}>
      <Field.Label>{required ? `${label} *` : label}</Field.Label>
      {children}
      {error ? <Field.Error>{error}</Field.Error> : null}
    </Field.Root>
  );
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
                  <ContactField
                    label={field.fieldLabel}
                    name={field.fieldName}
                    required={field.required}
                    error={fieldState.error?.message}
                  >
                    <Select.Root
                      name={field.fieldName}
                      required={field.required}
                      items={options}
                      value={controllerField.value ?? ''}
                      onValueChange={controllerField.onChange}
                    >
                      <Select.Trigger>
                        <Select.Value placeholder="Selectionnez une option" />
                        <Select.Icon>
                          <ChevronDown size={16} />
                        </Select.Icon>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Positioner sideOffset={8}>
                          <Select.Popup>
                            <Select.List>
                              {options.map((option) => (
                                <Select.Item
                                  key={option.value}
                                  value={option.value}
                                >
                                  <Select.ItemText>
                                    {option.label}
                                  </Select.ItemText>
                                </Select.Item>
                              ))}
                            </Select.List>
                          </Select.Popup>
                        </Select.Positioner>
                      </Select.Portal>
                    </Select.Root>
                  </ContactField>
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
                  <ContactField
                    label={field.fieldLabel}
                    name={field.fieldName}
                    required={field.required}
                    error={fieldState.error?.message}
                  >
                    <Field.Control
                      render={<textarea rows={5} />}
                      name={field.fieldName}
                      required={field.required}
                      value={controllerField.value ?? ''}
                      onChange={controllerField.onChange}
                      onBlur={controllerField.onBlur}
                    />
                  </ContactField>
                ) : (
                  <ContactField
                    label={field.fieldLabel}
                    name={field.fieldName}
                    required={field.required}
                    error={fieldState.error?.message}
                  >
                    <Field.Control
                      name={field.fieldName}
                      required={field.required}
                      value={controllerField.value ?? ''}
                      onChange={controllerField.onChange}
                      onBlur={controllerField.onBlur}
                    />
                  </ContactField>
                )
              }
            />
          );
        })}
        <Button type="submit" variant="solid" disabled={isSubmitting}>
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
