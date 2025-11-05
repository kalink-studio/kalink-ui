'use client';

import {
  CheckboxInput,
  FieldDescription,
  TextInput,
  useField,
} from '@payloadcms/ui';
import React, { Fragment, useCallback, useEffect, useMemo } from 'react';

import { formatSlug } from './formatSlug';

import type { SlugAdminCustom } from './types';
import type { FieldType } from '@payloadcms/ui';
import type { TextFieldClientProps } from 'payload';

const baseClass = 'slug-field';

interface SlugFieldProps extends TextFieldClientProps {
  readonly field: TextFieldClientProps['field'] & {
    admin?: TextFieldClientProps['field']['admin'] & {
      custom?: Record<string, unknown>;
    };
  };
}

const isSlugAdminCustom = (value: unknown): value is SlugAdminCustom => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Partial<SlugAdminCustom>;

  return (
    typeof candidate.overrideFieldPath === 'string' &&
    typeof candidate.overrideLabel === 'string' &&
    typeof candidate.sourceFieldPath === 'string'
  );
};

export const SlugField: React.FC<SlugFieldProps> = (props) => {
  const {
    field,
    field: {
      admin: { autoComplete, className, description, placeholder, rtl } = {},
      label,
      localized,
      required,
    },
    inputRef,
    onKeyDown,
    path: pathFromProps,
    readOnly,
  } = props;

  const rawCustom = (field.admin?.custom as { slug?: unknown })?.slug;
  const slugCustom = isSlugAdminCustom(rawCustom) ? rawCustom : undefined;

  const overrideFieldPath =
    slugCustom?.overrideFieldPath ?? `${pathFromProps}ManualOverride`;
  const overrideLabel = slugCustom?.overrideLabel ?? 'Edit slug manually';
  const overrideDescription = slugCustom?.overrideDescription;
  const sourceFieldPath = slugCustom?.sourceFieldPath ?? 'title';

  const {
    customComponents: {
      AfterInput,
      BeforeInput,
      Description,
      Error,
      Label,
    } = {},
    disabled,
    path,
    setValue,
    showError,
    value,
  }: FieldType<string> = useField<string>({
    potentiallyStalePath: pathFromProps,
  });

  const { setValue: setOverrideValue, value: overrideValue } =
    useField<boolean>({
      path: overrideFieldPath,
    });

  const { value: sourceValue } = useField<string | undefined>({
    path: sourceFieldPath,
  });

  const manualOverride = Boolean(overrideValue);
  const slugValue = typeof value === 'string' ? value : '';
  const normalizedSource = typeof sourceValue === 'string' ? sourceValue : '';
  const formattedTitleSlug = useMemo(
    () => formatSlug(normalizedSource),
    [normalizedSource],
  );

  useEffect(() => {
    if (!manualOverride && slugValue !== formattedTitleSlug) {
      setValue(formattedTitleSlug);
    }
  }, [formattedTitleSlug, manualOverride, setValue, slugValue]);

  useEffect(() => {
    if (!manualOverride) {
      return;
    }

    const formattedOverride = formatSlug(slugValue);

    if (formattedOverride !== slugValue) {
      setValue(formattedOverride);
    }
  }, [manualOverride, setValue, slugValue]);

  const handleSlugChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      if (disabled || readOnly || !manualOverride) {
        return;
      }

      const nextValue = formatSlug(event.target.value);

      setValue(nextValue);
    },
    [disabled, manualOverride, readOnly, setValue],
  );

  const handleOverrideToggle = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const nextOverride = event.target.checked;

      setOverrideValue(nextOverride);

      if (!nextOverride && formattedTitleSlug !== slugValue) {
        setValue(formattedTitleSlug);
      }
    },
    [formattedTitleSlug, setOverrideValue, setValue, slugValue],
  );

  const classes = useMemo(
    () => [baseClass, className].filter(Boolean).join(' '),
    [className],
  );

  const afterInput = useMemo(
    () => (
      <Fragment>
        <div
          className={`${baseClass}__manual-toggle`}
          style={{ marginTop: '0.75rem' }}
        >
          <CheckboxInput
            checked={manualOverride}
            className={`${baseClass}__manual-toggle-input`}
            label={overrideLabel}
            onToggle={handleOverrideToggle}
            readOnly={disabled || readOnly}
          />
          {overrideDescription ? (
            <FieldDescription
              description={overrideDescription}
              path={`${pathFromProps}__override`}
            />
          ) : null}
        </div>
        {AfterInput}
      </Fragment>
    ),
    [
      AfterInput,
      disabled,
      handleOverrideToggle,
      manualOverride,
      overrideDescription,
      overrideLabel,
      pathFromProps,
      readOnly,
    ],
  );

  return (
    <TextInput
      AfterInput={afterInput}
      BeforeInput={BeforeInput}
      className={classes}
      Description={Description}
      description={description}
      Error={Error}
      htmlAttributes={{
        autoComplete: autoComplete ?? undefined,
      }}
      inputRef={inputRef}
      Label={Label}
      label={label}
      localized={localized}
      onChange={handleSlugChange}
      onKeyDown={onKeyDown}
      path={path}
      placeholder={placeholder}
      readOnly={readOnly || disabled || !manualOverride}
      required={required}
      rtl={rtl}
      showError={showError}
      value={slugValue}
    />
  );
};
