import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { ImageTransformField } from './image-transform-field.js';
import { IMAGE_TRANSFORM_FIELD_CUSTOM_KEY } from './types.js';

type MockFieldState = {
  addedByServer?: boolean;
  initialValue?: unknown;
  isModified?: boolean;
  value?: unknown;
};

type MockUpdateAction = {
  path: string;
  type: string;
  value?: unknown;
};

type MockUpdateManyAction = {
  formState: Record<string, MockFieldState>;
  type: 'UPDATE_MANY';
};

type MockDispatchAction = MockUpdateAction | MockUpdateManyAction;

const isPathAction = (action: MockDispatchAction): action is MockUpdateAction =>
  'path' in action;

const isUpdateManyAction = (
  action: MockDispatchAction,
): action is MockUpdateManyAction => 'formState' in action;

const mockPayloadUi = vi.hoisted(() => {
  const subscribers = new Set<() => void>();
  let formFields: Record<string, MockFieldState | undefined> = {};
  const documentInfo = {
    collectionSlug: 'pages',
    data: {},
    globalSlug: undefined,
    id: 1,
    isEditing: true,
    setData: vi.fn((nextData: Record<string, unknown>) => {
      documentInfo.data = nextData;
      subscribers.forEach((listener) => listener());
    }),
  };

  const notify = () => {
    subscribers.forEach((listener) => listener());
  };

  const dispatchFields = vi.fn(
    (
      action:
        | {
            path: string;
            type: string;
            value?: unknown;
          }
        | {
            formState: Record<
              string,
              { value?: unknown; isModified?: boolean }
            >;
            type: 'UPDATE_MANY';
          },
    ) => {
      if ('formState' in action) {
        formFields = {
          ...formFields,
          ...action.formState,
        };
        notify();

        return;
      }

      const { path, type, value } = action;

      if (type === 'REMOVE') {
        // Payload reducer: REMOVE deletes the entry from form state entirely.
        const nextFormFields = { ...formFields };

        delete nextFormFields[path];
        formFields = nextFormFields;
      } else {
        // Payload reducer: UPDATE always keeps the field entry, even when
        // value is undefined – it just sets `{ value: <whatever> }`.
        formFields = {
          ...formFields,
          [path]: {
            ...(formFields[path] ?? {}),
            value,
          },
        };
      }

      notify();
    },
  );

  return {
    config: {
      routes: { api: '/api' },
      serverURL: 'http://localhost:3000',
    },
    dispatchFields,
    documentInfo,
    getFormFields: () => formFields,
    reset: (nextFormFields: Record<string, MockFieldState | undefined>) => {
      formFields = { ...nextFormFields };
      documentInfo.data = {};
      documentInfo.setData.mockClear();
      dispatchFields.mockClear();
      notify();
    },
    setFormFields: (
      nextFormFields: Record<string, MockFieldState | undefined>,
    ) => {
      formFields = { ...nextFormFields };
      notify();
    },
    mergeServerState: (incomingState: Record<string, MockFieldState>) => {
      const nextFormFields = { ...formFields };

      for (const [path, incomingField] of Object.entries(incomingState)) {
        const currentField = formFields[path];

        if (!currentField && !incomingField.addedByServer) {
          continue;
        }

        const shouldAcceptValue =
          incomingField.addedByServer || currentField?.isModified !== true;
        const sanitizedIncomingField = shouldAcceptValue
          ? incomingField
          : Object.fromEntries(
              Object.entries(incomingField).filter(([key]) => key !== 'value'),
            );

        nextFormFields[path] = {
          ...(currentField ?? {}),
          ...sanitizedIncomingField,
        };
      }

      formFields = nextFormFields;
      notify();
    },
    setModified: vi.fn(),
    subscribe: (listener: () => void) => {
      subscribers.add(listener);

      return () => subscribers.delete(listener);
    },
  };
});

vi.mock('@payloadcms/ui', async () => {
  const ReactModule = await import('react');

  return {
    Button: ({
      buttonStyle: _buttonStyle,
      children,
      margin: _margin,
      size: _size,
      ...props
    }: React.ComponentProps<'button'> & {
      buttonStyle?: string;
      margin?: boolean;
      size?: string;
    }) => (
      <button data-button-style={_buttonStyle} type="button" {...props}>
        {children}
      </button>
    ),
    FieldDescription: ({ description }: { description: React.ReactNode }) => (
      <div>{description}</div>
    ),
    FieldLabel: ({ label }: { label?: React.ReactNode }) => (
      <label>{label}</label>
    ),
    RenderFields: () => <div data-testid="source-field" />,
    useConfig: () => ({ config: mockPayloadUi.config }),
    useDocumentInfo: () => {
      ReactModule.useSyncExternalStore(
        mockPayloadUi.subscribe,
        () => mockPayloadUi.documentInfo,
        () => mockPayloadUi.documentInfo,
      );

      return mockPayloadUi.documentInfo;
    },
    useForm: () => ({
      dispatchFields: mockPayloadUi.dispatchFields,
      setModified: mockPayloadUi.setModified,
    }),
    useFormFields: (
      selector: (
        args: [Record<string, { value?: unknown } | undefined>],
      ) => unknown,
    ) => {
      const snapshot = ReactModule.useSyncExternalStore(
        mockPayloadUi.subscribe,
        mockPayloadUi.getFormFields,
        mockPayloadUi.getFormFields,
      );

      return selector([snapshot]);
    },
  };
});

const source = {
  id: 1,
  relationTo: 'media',
  updatedAt: '2026-03-11T10:00:00.000Z',
  url: 'http://localhost:3000/api/media/file/hero.jpg',
};

const createField = () => ({
  admin: {
    custom: {
      [IMAGE_TRANSFORM_FIELD_CUSTOM_KEY]: {
        derivativeCollectionSlug: 'mediaDerivatives',
        presets: [
          { aspectRatio: '16:9', key: 'landscape', label: 'Landscape' },
        ],
        relationTo: 'media',
      },
    },
  },
  fields: [
    {
      admin: {
        hidden: true,
      },
      label: 'Source image',
      name: 'source',
      relationTo: 'media',
      type: 'upload',
    },
  ],
  label: 'Image',
  name: 'heroImage',
  type: 'group',
});

const renderField = () =>
  render(
    <ImageTransformField
      field={createField() as never}
      path="heroImage"
      permissions={true}
      schemaPath="heroImage"
    />,
  );

const createReadyFormFields = () => ({
  'heroImage.presets.landscape.crop.x': { value: 30 },
  'heroImage.presets.landscape.crop.y': { value: 40 },
  'heroImage.presets.landscape.crop.zoom': { value: 1.5 },
  'heroImage.presets.landscape.derivative': {
    value: {
      id: 7,
      url: 'http://localhost:3000/api/mediaDerivatives/file/hero.jpg',
    },
  },
  'heroImage.presets.landscape.fingerprint': { value: 'intent-1' },
  'heroImage.presets.landscape.lastGeneratedAt': {
    value: '2026-03-11T10:05:00.000Z',
  },
  'heroImage.presets.landscape.sourceVersion': { value: source.updatedAt },
  'heroImage.presets.landscape.state': { value: 'ready' },
  'heroImage.source': { value: source },
});

/** Open the overflow menu near the preview and click "Clear derivative". */
const clickClearDerivativeViaMenu = () => {
  fireEvent.click(screen.getByRole('button', { name: 'More actions' }));
  fireEvent.click(screen.getByRole('menuitem', { name: 'Clear derivative' }));
};

beforeAll(() => {
  class MockResizeObserver {
    observe(): void {}

    disconnect(): void {}
  }

  vi.stubGlobal('ResizeObserver', MockResizeObserver);
  vi.stubGlobal(
    'Image',
    class {
      naturalHeight = 930;
      naturalWidth = 621;
      onload?: () => void;

      set src(_value: string) {
        queueMicrotask(() => this.onload?.());
      }
    },
  );
});

describe('ImageTransformField', () => {
  beforeEach(() => {
    mockPayloadUi.reset({ 'heroImage.source': { value: source } });
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('shows a ready preset after successful generation', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            doc: { id: 1, updatedAt: '2026-03-12T11:49:41.499Z' },
            errors: {},
            generatedPresetKeys: ['landscape'],
            value: {
              presets: {
                landscape: {
                  crop: { x: 50, y: 50, zoom: 1 },
                  derivative: {
                    id: 7,
                    url: 'http://localhost:3000/api/mediaDerivatives/file/hero.jpg',
                  },
                  fingerprint: 'intent-1',
                  sourceVersion: source.updatedAt,
                  state: 'ready',
                },
              },
              source,
            },
          }),
        ),
      ),
    );

    renderField();
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));

    await waitFor(() => {
      expect(screen.getByText('Ready')).toBeTruthy();
    });
    expect(screen.getByRole('button', { name: 'Regenerate' })).toBeTruthy();
    expect(mockPayloadUi.documentInfo.setData).toHaveBeenCalledWith(
      expect.objectContaining({
        heroImage: expect.objectContaining({ source }),
        id: 1,
        updatedAt: '2026-03-12T11:49:41.499Z',
      }),
    );
    // "Clear derivative" is now behind an overflow menu
    expect(screen.getByRole('button', { name: 'More actions' })).toBeTruthy();
  });

  it('reveals "Clear derivative" inside the overflow menu', async () => {
    mockPayloadUi.reset(createReadyFormFields());
    renderField();

    await waitFor(() => {
      expect(screen.getByText('Ready')).toBeTruthy();
    });

    // Menu item should not be visible before opening the menu
    expect(
      screen.queryByRole('menuitem', { name: 'Clear derivative' }),
    ).toBeNull();

    // Open the overflow menu
    fireEvent.click(screen.getByRole('button', { name: 'More actions' }));

    // Now the menu item should be visible
    expect(
      screen.getByRole('menuitem', { name: 'Clear derivative' }),
    ).toBeTruthy();
  });

  it('resets the UI to a fresh missing state after clear removes the preset', async () => {
    mockPayloadUi.reset(createReadyFormFields());
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            doc: {},
            errors: {},
            generatedPresetKeys: [],
            value: {
              source,
            },
          }),
        ),
      ),
    );

    renderField();
    clickClearDerivativeViaMenu();

    await waitFor(() => {
      expect(screen.queryByText('Ready')).toBeNull();
      expect(screen.getByText('Missing')).toBeTruthy();
    });
    expect(screen.getByRole('button', { name: 'Generate' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Regenerate' })).toBeNull();
    // The overflow menu button should be gone when no derivative exists
    expect(screen.queryByRole('button', { name: 'More actions' })).toBeNull();
    expect(screen.queryByAltText('Derivative preview')).toBeNull();

    // Verify REMOVE semantics: the preset leaf entries must be fully deleted
    // from form state, not merely set to `{ value: undefined }`.
    const formFields = mockPayloadUi.getFormFields();

    expect(formFields['heroImage.presets.landscape.state']).toBeUndefined();
    expect(
      formFields['heroImage.presets.landscape.derivative'],
    ).toBeUndefined();
    expect(
      formFields['heroImage.presets.landscape.fingerprint'],
    ).toBeUndefined();
  });

  it('dispatches REMOVE (not UPDATE-with-undefined) when clearing presets', async () => {
    mockPayloadUi.reset(createReadyFormFields());
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            doc: {},
            errors: {},
            generatedPresetKeys: [],
            value: {
              source,
            },
          }),
        ),
      ),
    );

    renderField();
    mockPayloadUi.dispatchFields.mockClear();
    clickClearDerivativeViaMenu();

    await waitFor(() => {
      expect(screen.getByText('Missing')).toBeTruthy();
    });

    // Every call that clears a preset field must use type: 'REMOVE',
    // never type: 'UPDATE' with value: undefined.
    const removeCalls = mockPayloadUi.dispatchFields.mock.calls.filter(
      ([action]: [{ type: string }]) => action.type === 'REMOVE',
    );
    const updateUndefinedCalls = mockPayloadUi.dispatchFields.mock.calls.filter(
      ([action]: [{ type: string; value?: unknown }]) =>
        action.type === 'UPDATE' && action.value === undefined,
    );

    expect(removeCalls.length).toBeGreaterThan(0);
    expect(updateUndefinedCalls.length).toBe(0);
  });

  it('clears preset UI state when the source image is removed and reselected', async () => {
    mockPayloadUi.reset(createReadyFormFields());
    renderField();

    await waitFor(() => {
      expect(screen.getByText('Ready')).toBeTruthy();
    });

    // Simulate clearing the source – form fields are wiped externally but the
    // component's source-change effect fires REMOVE dispatches as well.
    mockPayloadUi.setFormFields({});

    await waitFor(() => {
      expect(screen.queryByText('Ready')).toBeNull();
      expect(
        screen.getByText(
          'Select a source image above to configure crop presets.',
        ),
      ).toBeTruthy();
    });

    // The source-change effect must have dispatched REMOVE for the presets
    // root path so the entry is fully gone from form state.
    const removePresetsRoot = mockPayloadUi.dispatchFields.mock.calls.some(
      ([action]: [MockDispatchAction]) =>
        isPathAction(action) &&
        action.type === 'REMOVE' &&
        action.path === 'heroImage.presets',
    );

    expect(removePresetsRoot).toBe(true);

    mockPayloadUi.setFormFields({ 'heroImage.source': { value: source } });

    await waitFor(() => {
      expect(screen.queryByText('Ready')).toBeNull();
      expect(screen.getByText('Missing')).toBeTruthy();
    });
    expect(screen.getByRole('button', { name: 'Generate' })).toBeTruthy();
    // No derivative → no overflow menu
    expect(screen.queryByRole('button', { name: 'More actions' })).toBeNull();
  });

  it('shows enabled "Reset to default" when crop differs from defaults', async () => {
    const generationResponse = {
      doc: {},
      errors: {},
      generatedPresetKeys: ['landscape'],
      value: {
        presets: {
          landscape: {
            crop: { x: 30, y: 40, zoom: 1.5 },
            derivative: {
              id: 7,
              url: 'http://localhost:3000/api/mediaDerivatives/file/hero.jpg',
            },
            fingerprint: 'intent-1',
            lastGeneratedAt: '2026-03-11T10:05:00.000Z',
            sourceVersion: source.updatedAt,
            state: 'ready',
          },
        },
        source,
      },
    };

    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(new Response(JSON.stringify(generationResponse))),
    );

    renderField();
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));

    await waitFor(() => {
      expect(screen.getByText('Ready')).toBeTruthy();
    });

    // The "Reset to default" button is always present; verify it is enabled
    // when crop differs from defaults.
    const resetButton = screen.getByRole('button', {
      name: 'Reset to default',
    });

    expect(resetButton).toBeTruthy();
    expect((resetButton as HTMLButtonElement).disabled).toBe(false);
    expect(screen.queryByRole('button', { name: 'Reset crop' })).toBeNull();
  });

  it('renders "Revert to generated" and "Reset to default" as disabled when at defaults', () => {
    mockPayloadUi.reset({ 'heroImage.source': { value: source } });
    renderField();

    // Both buttons are always rendered in the Position title row, but
    // disabled when there are no crop changes / no derivative.
    const revertButton = screen.getByRole('button', {
      name: 'Revert to generated',
    });
    const resetButton = screen.getByRole('button', {
      name: 'Reset to default',
    });

    expect((revertButton as HTMLButtonElement).disabled).toBe(true);
    expect((resetButton as HTMLButtonElement).disabled).toBe(true);
  });

  it('enables "Revert to generated" after generation then local crop change', async () => {
    const generationResponse = {
      doc: {},
      errors: {},
      generatedPresetKeys: ['landscape'],
      value: {
        presets: {
          landscape: {
            crop: { x: 50, y: 50, zoom: 1 },
            derivative: {
              id: 7,
              url: 'http://localhost:3000/api/mediaDerivatives/file/hero.jpg',
            },
            fingerprint: 'intent-1',
            lastGeneratedAt: '2026-03-11T10:05:00.000Z',
            sourceVersion: source.updatedAt,
            state: 'ready',
          },
        },
        source,
      },
    };

    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(new Response(JSON.stringify(generationResponse))),
    );

    renderField();
    fireEvent.click(screen.getByRole('button', { name: 'Generate' }));

    await waitFor(() => {
      expect(screen.getByText('Ready')).toBeTruthy();
    });

    // "Revert to generated" should be disabled because crop matches the
    // generation baseline (both are default 50/50/1).
    expect(
      (
        screen.getByRole('button', {
          name: 'Revert to generated',
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);

    // Now simulate user tweaking the crop locally by updating form fields.
    mockPayloadUi.setFormFields({
      ...mockPayloadUi.getFormFields(),
      'heroImage.presets.landscape.crop.x': { value: 60 },
      'heroImage.presets.landscape.crop.y': { value: 35 },
      'heroImage.presets.landscape.crop.zoom': { value: 1 },
    });

    await waitFor(() => {
      expect(
        (
          screen.getByRole('button', {
            name: 'Revert to generated',
          }) as HTMLButtonElement
        ).disabled,
      ).toBe(false);
    });

    // Click "Revert to generated" and verify crop is dispatched back to the
    // generation baseline (x=50, y=50, zoom=1).
    mockPayloadUi.dispatchFields.mockClear();
    fireEvent.click(
      screen.getByRole('button', { name: 'Revert to generated' }),
    );

    await waitFor(() => {
      const xUpdate = mockPayloadUi.dispatchFields.mock.calls.find(
        ([action]: [MockDispatchAction]) =>
          isPathAction(action) &&
          action.path === 'heroImage.presets.landscape.crop.x' &&
          action.type === 'UPDATE',
      );

      expect(xUpdate).toBeTruthy();
      expect((xUpdate![0] as MockUpdateAction).value).toBe(50);
    });

    // After revert, the button should return to disabled state since crop
    // matches the baseline.
    await waitFor(() => {
      expect(
        (
          screen.getByRole('button', {
            name: 'Revert to generated',
          }) as HTMLButtonElement
        ).disabled,
      ).toBe(true);
    });
  });

  it('disables "Revert to generated" when no derivative exists', () => {
    // Default state: source selected but no generation yet.
    mockPayloadUi.reset({ 'heroImage.source': { value: source } });
    renderField();

    expect(
      (
        screen.getByRole('button', {
          name: 'Revert to generated',
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
  });

  it('renders "Clear derivative" with destructive styling inside the overflow menu', async () => {
    mockPayloadUi.reset(createReadyFormFields());
    renderField();

    await waitFor(() => {
      expect(screen.getByText('Ready')).toBeTruthy();
    });

    // Open the overflow menu
    fireEvent.click(screen.getByRole('button', { name: 'More actions' }));

    const clearMenuItem = screen.getByRole('menuitem', {
      name: 'Clear derivative',
    });

    expect(window.getComputedStyle(clearMenuItem).color).toBe(
      'rgb(220, 38, 38)',
    );
  });

  it('closes overflow menu on Escape key', async () => {
    mockPayloadUi.reset(createReadyFormFields());
    renderField();

    await waitFor(() => {
      expect(screen.getByText('Ready')).toBeTruthy();
    });

    // Open the overflow menu
    fireEvent.click(screen.getByRole('button', { name: 'More actions' }));
    expect(screen.getByRole('menu')).toBeTruthy();

    // Press Escape
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });

    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('shows derivative thumbnail when derivative.url is already present', async () => {
    mockPayloadUi.reset(createReadyFormFields());
    renderField();

    await waitFor(() => {
      expect(screen.getByText('Ready')).toBeTruthy();
    });

    const thumbnail = screen.getByAltText('Derivative preview');

    expect(thumbnail).toBeTruthy();
    expect((thumbnail as HTMLImageElement).src).toBe(
      'http://localhost:3000/api/mediaDerivatives/file/hero.jpg',
    );
  });

  it('fetches derivative URL and shows thumbnail when derivative is an ID-only value', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/mediaDerivatives/7')) {
          return Promise.resolve(
            new Response(
              JSON.stringify({
                id: 7,
                url: 'http://localhost:3000/api/mediaDerivatives/file/hero-fetched.jpg',
              }),
            ),
          );
        }

        return Promise.resolve(new Response('{}', { status: 404 }));
      }),
    );

    mockPayloadUi.reset({
      'heroImage.presets.landscape.crop.x': { value: 50 },
      'heroImage.presets.landscape.crop.y': { value: 50 },
      'heroImage.presets.landscape.crop.zoom': { value: 1 },
      'heroImage.presets.landscape.derivative': { value: 7 },
      'heroImage.presets.landscape.fingerprint': { value: 'intent-1' },
      'heroImage.presets.landscape.lastGeneratedAt': {
        value: '2026-03-11T10:05:00.000Z',
      },
      'heroImage.presets.landscape.sourceVersion': { value: source.updatedAt },
      'heroImage.presets.landscape.state': { value: 'ready' },
      'heroImage.source': { value: source },
    });

    renderField();

    await waitFor(() => {
      expect(screen.getByText('Ready')).toBeTruthy();
    });

    await waitFor(() => {
      const thumbnail = screen.getByAltText('Derivative preview');

      expect(thumbnail).toBeTruthy();
      expect((thumbnail as HTMLImageElement).src).toBe(
        'http://localhost:3000/api/mediaDerivatives/file/hero-fetched.jpg',
      );
    });
  });

  it('fetches derivative URL and shows thumbnail when derivative is a relation wrapper', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/mediaDerivatives/7')) {
          return Promise.resolve(
            new Response(
              JSON.stringify({
                id: 7,
                url: 'http://localhost:3000/api/mediaDerivatives/file/hero-wrapped.jpg',
              }),
            ),
          );
        }

        return Promise.resolve(new Response('{}', { status: 404 }));
      }),
    );

    mockPayloadUi.reset({
      'heroImage.presets.landscape.crop.x': { value: 50 },
      'heroImage.presets.landscape.crop.y': { value: 50 },
      'heroImage.presets.landscape.crop.zoom': { value: 1 },
      'heroImage.presets.landscape.derivative': {
        value: { relationTo: 'mediaDerivatives', value: 7 },
      },
      'heroImage.presets.landscape.fingerprint': { value: 'intent-1' },
      'heroImage.presets.landscape.lastGeneratedAt': {
        value: '2026-03-11T10:05:00.000Z',
      },
      'heroImage.presets.landscape.sourceVersion': { value: source.updatedAt },
      'heroImage.presets.landscape.state': { value: 'ready' },
      'heroImage.source': { value: source },
    });

    renderField();

    await waitFor(() => {
      expect(screen.getByText('Ready')).toBeTruthy();
    });

    await waitFor(() => {
      const thumbnail = screen.getByAltText('Derivative preview');

      expect(thumbnail).toBeTruthy();
      expect((thumbnail as HTMLImageElement).src).toBe(
        'http://localhost:3000/api/mediaDerivatives/file/hero-wrapped.jpg',
      );
    });
  });

  describe('root form-state synchronization on manual source changes', () => {
    it('normalizes root group value to {} when the source is cleared', async () => {
      mockPayloadUi.reset(createReadyFormFields());
      renderField();

      await waitFor(() => {
        expect(screen.getByText('Ready')).toBeTruthy();
      });

      // Clear the mock so we only see dispatches from the source-change effect.
      mockPayloadUi.dispatchFields.mockClear();

      // Simulate clearing the source upload.
      mockPayloadUi.setFormFields({});

      await waitFor(() => {
        expect(
          screen.getByText(
            'Select a source image above to configure crop presets.',
          ),
        ).toBeTruthy();
      });

      // The source-change effect must UPDATE the root group field entry to {}
      // so no stale source/derivative data lingers in the parent form state.
      const rootUpdate = mockPayloadUi.dispatchFields.mock.calls.find(
        ([action]: [MockDispatchAction]) =>
          isUpdateManyAction(action) && 'heroImage' in action.formState,
      );

      expect(rootUpdate).toBeTruthy();
      expect(
        (rootUpdate![0] as MockUpdateManyAction).formState.heroImage?.value,
      ).toEqual({});
    });

    it('rewrites root group value to new source without stale derivatives on reselect', async () => {
      mockPayloadUi.reset(createReadyFormFields());
      renderField();

      await waitFor(() => {
        expect(screen.getByText('Ready')).toBeTruthy();
      });

      // Simulate clearing the source.
      mockPayloadUi.setFormFields({});

      await waitFor(() => {
        expect(
          screen.getByText(
            'Select a source image above to configure crop presets.',
          ),
        ).toBeTruthy();
      });

      // Clear dispatch history and select a new source.
      mockPayloadUi.dispatchFields.mockClear();
      const newSource = { ...source, id: 42, url: '/api/media/file/new.jpg' };

      mockPayloadUi.setFormFields({
        'heroImage.source': { value: newSource },
      });

      await waitFor(() => {
        expect(screen.getByText('Missing')).toBeTruthy();
      });

      // The root group value must contain only the new source – no stale
      // derivative or preset data from the previous source.
      const rootUpdate = mockPayloadUi.dispatchFields.mock.calls.find(
        ([action]: [MockDispatchAction]) =>
          isUpdateManyAction(action) && 'heroImage' in action.formState,
      );

      expect(rootUpdate).toBeTruthy();
      expect(
        (rootUpdate![0] as MockUpdateManyAction).formState.heroImage?.value,
      ).toEqual({ source: newSource });
    });

    it('calls documentInfo.setData on manual source changes', async () => {
      mockPayloadUi.reset(createReadyFormFields());
      renderField();

      await waitFor(() => {
        expect(screen.getByText('Ready')).toBeTruthy();
      });

      // Clear setData history so we only track calls from the source-change
      // effect.
      mockPayloadUi.documentInfo.setData.mockClear();

      // Simulate clearing the source.
      mockPayloadUi.setFormFields({});

      await waitFor(() => {
        expect(
          screen.getByText(
            'Select a source image above to configure crop presets.',
          ),
        ).toBeTruthy();
      });

      // documentInfo.setData must have been called at least once with the
      // cleared root value.
      expect(mockPayloadUi.documentInfo.setData).toHaveBeenCalled();
      const lastCall =
        mockPayloadUi.documentInfo.setData.mock.calls[
          mockPayloadUi.documentInfo.setData.mock.calls.length - 1
        ];

      expect(lastCall![0]).toEqual(expect.objectContaining({ heroImage: {} }));

      // Now select a new source and verify setData is called again.
      mockPayloadUi.documentInfo.setData.mockClear();
      const newSource = { ...source, id: 99, url: '/api/media/file/alt.jpg' };

      mockPayloadUi.setFormFields({
        'heroImage.source': { value: newSource },
      });

      await waitFor(() => {
        expect(screen.getByText('Missing')).toBeTruthy();
      });

      expect(mockPayloadUi.documentInfo.setData).toHaveBeenCalled();
      const lastCallAfterReselect =
        mockPayloadUi.documentInfo.setData.mock.calls[
          mockPayloadUi.documentInfo.setData.mock.calls.length - 1
        ];

      expect(lastCallAfterReselect![0]).toEqual(
        expect.objectContaining({ heroImage: { source: newSource } }),
      );
    });

    it('preserves the newly selected source across a server merge', async () => {
      mockPayloadUi.reset(createReadyFormFields());
      renderField();

      await waitFor(() => {
        expect(screen.getByText('Ready')).toBeTruthy();
      });

      const newSource = { ...source, id: 2, url: '/api/media/file/new.jpg' };

      mockPayloadUi.setFormFields({
        ...mockPayloadUi.getFormFields(),
        'heroImage.source': {
          value: newSource,
          isModified: true,
        },
      });

      await waitFor(() => {
        const heroImageField = mockPayloadUi.getFormFields().heroImage;

        expect(heroImageField?.value).toEqual({ source: newSource });
      });

      mockPayloadUi.mergeServerState({
        'heroImage.source': {
          initialValue: source,
          value: source,
        },
      });

      await waitFor(() => {
        expect(
          mockPayloadUi.getFormFields()['heroImage.source']?.value,
        ).toEqual(newSource);
      });
    });
  });
});
