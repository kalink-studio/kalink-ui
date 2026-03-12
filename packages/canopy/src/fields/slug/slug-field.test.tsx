import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { SlugField } from './slug-field';

import type { SlugAdminCustom } from './types';

/**
 * Lightweight mock for `@payloadcms/ui` that exposes controllable field values
 * and a `setValue` spy so tests can verify change/blur behaviour without a full
 * Payload form context.
 */
const mockPayloadUi = vi.hoisted(() => {
  const subscribers = new Set<() => void>();
  let fieldValues: Record<string, unknown> = {};

  const notify = () => {
    subscribers.forEach((listener) => listener());
  };

  const setValueSpy = vi.fn((path: string, next: unknown) => {
    fieldValues = { ...fieldValues, [path]: next };
    notify();
  });

  return {
    getFieldValues: () => fieldValues,
    notify,
    reset: (initial: Record<string, unknown>) => {
      fieldValues = { ...initial };
      setValueSpy.mockClear();
      notify();
    },
    setValueSpy,
    subscribe: (listener: () => void) => {
      subscribers.add(listener);

      return () => subscribers.delete(listener);
    },
  };
});

vi.mock('@payloadcms/ui', async () => {
  const ReactModule = await import('react');

  return {
    CheckboxInput: ({
      checked,
      label,
      onToggle,
      readOnly: _readOnly,
    }: {
      checked: boolean;
      label: string;
      onToggle: React.ChangeEventHandler<HTMLInputElement>;
      readOnly?: boolean;
    }) => (
      <label>
        <input checked={checked} onChange={onToggle} type="checkbox" />
        {label}
      </label>
    ),
    FieldDescription: ({ description }: { description: React.ReactNode }) => (
      <div>{description}</div>
    ),
    TextInput: ({
      inputRef,
      onChange,
      path: _path,
      readOnly,
      value,
      AfterInput,
      ...rest
    }: {
      AfterInput?: React.ReactNode;
      inputRef?: React.RefObject<HTMLInputElement>;
      onChange?: React.ChangeEventHandler<HTMLInputElement>;
      path: string;
      readOnly?: boolean;
      value?: string;
      [key: string]: unknown;
    }) => {
      const ariaLabel = typeof rest.label === 'string' ? rest.label : 'Slug';

      return (
        <div>
          {AfterInput}
          <input
            aria-label={ariaLabel}
            data-testid="slug-input"
            onChange={readOnly ? undefined : onChange}
            readOnly={readOnly}
            ref={inputRef}
            value={value ?? ''}
          />
        </div>
      );
    },
    useField: (opts: { path?: string; potentiallyStalePath?: string }) => {
      const fieldPath = opts.path ?? opts.potentiallyStalePath ?? '';

      const snapshot = ReactModule.useSyncExternalStore(
        mockPayloadUi.subscribe,
        mockPayloadUi.getFieldValues,
        mockPayloadUi.getFieldValues,
      );

      const value = snapshot[fieldPath];

      return {
        customComponents: {},
        disabled: false,
        path: fieldPath,
        setValue: (next: unknown) => {
          mockPayloadUi.setValueSpy(fieldPath, next);
        },
        showError: false,
        value,
      };
    },
  };
});

const slugCustom: SlugAdminCustom = {
  overrideFieldPath: 'slugManualOverride',
  overrideLabel: 'Edit slug manually',
  sourceFieldPath: 'title',
};

const createField = () =>
  ({
    admin: {
      custom: { slug: slugCustom },
    },
    hasMany: false,
    label: 'Slug',
    name: 'slug',
    type: 'text' as const,
  }) as never;

const renderSlugField = () =>
  render(
    <SlugField
      field={createField()}
      path="slug"
      permissions={true}
      schemaPath="slug"
    />,
  );

describe('SlugField', () => {
  afterEach(() => {
    cleanup();
  });

  describe('manual edit (formatSlugLive)', () => {
    it('preserves a trailing hyphen while typing', () => {
      mockPayloadUi.reset({
        slug: '',
        slugManualOverride: true,
        title: '',
      });

      renderSlugField();

      const input = screen.getByTestId('slug-input');

      fireEvent.change(input, { target: { value: 'hello-' } });

      expect(mockPayloadUi.setValueSpy).toHaveBeenCalledWith('slug', 'hello-');
    });

    it('preserves a leading hyphen while typing', () => {
      mockPayloadUi.reset({
        slug: '',
        slugManualOverride: true,
        title: '',
      });

      renderSlugField();

      const input = screen.getByTestId('slug-input');

      fireEvent.change(input, { target: { value: '-leading' } });

      expect(mockPayloadUi.setValueSpy).toHaveBeenCalledWith(
        'slug',
        '-leading',
      );
    });

    it('preserves consecutive hyphens mid-keystroke', () => {
      mockPayloadUi.reset({
        slug: '',
        slugManualOverride: true,
        title: '',
      });

      renderSlugField();

      const input = screen.getByTestId('slug-input');

      fireEvent.change(input, { target: { value: 'foo--bar' } });

      expect(mockPayloadUi.setValueSpy).toHaveBeenCalledWith(
        'slug',
        'foo--bar',
      );
    });

    it('converts uppercase and spaces to slug-friendly characters', () => {
      mockPayloadUi.reset({
        slug: '',
        slugManualOverride: true,
        title: '',
      });

      renderSlugField();

      const input = screen.getByTestId('slug-input');

      fireEvent.change(input, { target: { value: 'Hello World' } });

      expect(mockPayloadUi.setValueSpy).toHaveBeenCalledWith(
        'slug',
        'hello-world',
      );
    });

    it('strips diacritics while typing', () => {
      mockPayloadUi.reset({
        slug: '',
        slugManualOverride: true,
        title: '',
      });

      renderSlugField();

      const input = screen.getByTestId('slug-input');

      fireEvent.change(input, { target: { value: 'café' } });

      expect(mockPayloadUi.setValueSpy).toHaveBeenCalledWith('slug', 'cafe');
    });
  });

  describe('blur normalization', () => {
    it('trims leading and trailing hyphens on blur', () => {
      mockPayloadUi.reset({
        slug: '-hello-world-',
        slugManualOverride: true,
        title: '',
      });

      renderSlugField();

      const input = screen.getByTestId('slug-input');

      fireEvent.blur(input);

      expect(mockPayloadUi.setValueSpy).toHaveBeenCalledWith(
        'slug',
        'hello-world',
      );
    });

    it('collapses consecutive hyphens on blur', () => {
      mockPayloadUi.reset({
        slug: 'foo--bar',
        slugManualOverride: true,
        title: '',
      });

      renderSlugField();

      const input = screen.getByTestId('slug-input');

      fireEvent.blur(input);

      expect(mockPayloadUi.setValueSpy).toHaveBeenCalledWith('slug', 'foo-bar');
    });

    it('does not call setValue on blur when the value is already canonical', () => {
      mockPayloadUi.reset({
        slug: 'already-clean',
        slugManualOverride: true,
        title: '',
      });

      renderSlugField();

      const input = screen.getByTestId('slug-input');

      fireEvent.blur(input);

      // setValue should only have been called by the auto-sync effect (if at
      // all), not by the blur handler, because 'already-clean' is canonical.
      const blurSetValueCalls = mockPayloadUi.setValueSpy.mock.calls.filter(
        ([path, val]: [string, unknown]) =>
          path === 'slug' && val === 'already-clean',
      );

      expect(blurSetValueCalls).toHaveLength(0);
    });

    it('skips normalization on blur when manual override is off', () => {
      mockPayloadUi.reset({
        slug: '-not-normalized-',
        slugManualOverride: false,
        title: '',
      });

      renderSlugField();

      const input = screen.getByTestId('slug-input');

      mockPayloadUi.setValueSpy.mockClear();
      fireEvent.blur(input);

      // The blur handler should be a no-op when override is disabled.
      const slugCalls = mockPayloadUi.setValueSpy.mock.calls.filter(
        ([path]: [string, unknown]) => path === 'slug',
      );

      expect(slugCalls).toHaveLength(0);
    });
  });

  describe('typing then blurring (end-to-end)', () => {
    it('allows hyphen-typing during edit and normalizes on blur', () => {
      mockPayloadUi.reset({
        slug: '',
        slugManualOverride: true,
        title: '',
      });

      renderSlugField();

      const input = screen.getByTestId('slug-input');

      // Simulate typing a slug with a trailing hyphen mid-edit.
      fireEvent.change(input, { target: { value: 'my-post-' } });

      expect(mockPayloadUi.setValueSpy).toHaveBeenCalledWith(
        'slug',
        'my-post-',
      );

      // Now blur – trailing hyphen should be stripped.
      fireEvent.blur(input);

      expect(mockPayloadUi.setValueSpy).toHaveBeenCalledWith('slug', 'my-post');
    });
  });
});
