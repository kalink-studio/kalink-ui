'use client';

import {
  FieldDescription,
  FieldLabel,
  RenderFields,
  useConfig,
  useDocumentInfo,
  useForm,
  useFormFields,
} from '@payloadcms/ui';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  buildFieldValueFromFormState,
  isImageTransformAdminCustom,
  removePresetFormFields,
} from './form-state';
import styles from './image-transform-field.module.css';
import { PresetCard } from './preset-card';
import { getRelationID, isObject } from './relation-utils';
import { useSourceUrl } from './use-source-url';

import type {
  GenerationResult,
  ImageTransformFieldCustom,
  ImageTransformFieldValue,
} from './types';
import type { ClientField, GroupFieldClientProps } from 'payload';

import { IMAGE_TRANSFORM_FIELD_CUSTOM_KEY } from './types';

export const ImageTransformField: React.FC<GroupFieldClientProps> = (props) => {
  const {
    field,
    field: { admin: { description } = {}, label },
    path: pathFromProps,
    permissions,
    schemaPath: schemaPathFromProps,
  } = props;

  const rawCustom = field.admin?.custom?.[IMAGE_TRANSFORM_FIELD_CUSTOM_KEY];
  const customConfig = isImageTransformAdminCustom(rawCustom)
    ? rawCustom
    : undefined;

  const presets = customConfig?.presets ?? [];
  const relationTo = customConfig?.relationTo
    ? String(customConfig.relationTo)
    : undefined;
  const derivativeCollectionSlug = (
    customConfig as ImageTransformFieldCustom | undefined
  )?.derivativeCollectionSlug
    ? String(
        (customConfig as ImageTransformFieldCustom).derivativeCollectionSlug,
      )
    : undefined;

  const { config } = useConfig();
  const apiUrl = `${config.serverURL ?? ''}${config.routes?.api ?? '/api'}`;

  const documentInfo = useDocumentInfo();
  const ownerId = documentInfo.id;
  const collectionSlug = documentInfo.collectionSlug;
  const globalSlug = documentInfo.globalSlug;
  const isEditing = documentInfo.isEditing ?? false;

  const { dispatchFields } = useForm();

  const path = pathFromProps ?? (field as { name?: string }).name ?? '';

  const formFields = useFormFields(
    ([fields]) => fields as Record<string, { value?: unknown } | undefined>,
  );
  const fieldValue = useMemo(
    () => buildFieldValueFromFormState({ formFields, path, presets }),
    [formFields, path, presets],
  );

  const sourceValue = fieldValue?.source;
  const sourceID = getRelationID(sourceValue);
  const hasSource = Boolean(sourceID);
  const sourceUrl = useSourceUrl(sourceValue, relationTo, apiUrl);

  // Determine disabled state for generation actions
  const ownerNotSaved = !ownerId && !isEditing;
  const cannotGenerate = ownerNotSaved || !hasSource;
  const disabledReason = useMemo(() => {
    if (ownerNotSaved) {
      return 'Save the document before generating derivatives.';
    }

    if (!hasSource) {
      return 'Select a source image first.';
    }

    return undefined;
  }, [hasSource, ownerNotSaved]);

  const dataPath = path;
  const schemaPath = schemaPathFromProps ?? path;
  const rootFieldState = formFields[path];

  /** Update `documentInfo.setData` so the saved-data snapshot stays in sync
   *  with the current field value.  Extracted as a helper so both
   *  `handleFieldValueUpdate` and the source-change effect can reuse it. */
  const syncDocumentData = useCallback(
    (
      nextValue: ImageTransformFieldValue,
      serverDoc?: Record<string, unknown>,
    ) => {
      if (!documentInfo.setData) {
        return;
      }

      const nextData = isObject<Record<string, unknown>>(documentInfo.data)
        ? { ...documentInfo.data }
        : {};

      if (isObject<Record<string, unknown>>(serverDoc)) {
        if (serverDoc.id !== undefined) {
          nextData.id = serverDoc.id;
        }

        if (typeof serverDoc.updatedAt === 'string') {
          nextData.updatedAt = serverDoc.updatedAt;
        }

        if (typeof serverDoc._status === 'string') {
          nextData._status = serverDoc._status;
        }
      }

      const pathSegments = path.split('.');
      let target: Record<string, unknown> = nextData;

      for (let i = 0; i < pathSegments.length - 1; i++) {
        const segment = pathSegments[i]!;
        const existing = target[segment];

        if (isObject<Record<string, unknown>>(existing)) {
          target[segment] = { ...existing };
          target = target[segment] as Record<string, unknown>;
        } else {
          target[segment] = {};
          target = target[segment] as Record<string, unknown>;
        }
      }

      const lastSegment = pathSegments[pathSegments.length - 1]!;

      target[lastSegment] = nextValue;
      documentInfo.setData(nextData);
    },
    [documentInfo, path],
  );

  const handleFieldValueUpdate = useCallback(
    (
      nextValue: ImageTransformFieldValue,
      serverDoc?: Record<string, unknown>,
    ) => {
      dispatchFields({
        path,
        type: 'UPDATE',
        value: nextValue,
      });

      const hasPresets =
        nextValue.presets != null && Object.keys(nextValue.presets).length > 0;

      if (hasPresets) {
        dispatchFields({
          path: `${path}.presets`,
          type: 'UPDATE',
          value: nextValue.presets,
        });
      } else {
        dispatchFields({
          path: `${path}.presets`,
          type: 'REMOVE',
        });
      }

      for (const preset of presets) {
        const presetVal = nextValue.presets?.[preset.key];
        const presetBasePath = `${path}.presets.${preset.key}`;

        // If the server-returned value no longer contains this preset, clear
        // all its nested form fields so stale state does not linger.
        if (!presetVal) {
          removePresetFormFields(dispatchFields, presetBasePath);
          continue;
        }

        dispatchFields({
          path: presetBasePath,
          type: 'UPDATE',
          value: presetVal,
        });
        dispatchFields({
          path: `${presetBasePath}.crop`,
          type: 'UPDATE',
          value: presetVal.crop,
        });

        dispatchFields({
          path: `${presetBasePath}.crop.x`,
          type: 'UPDATE',
          value: presetVal.crop?.x,
        });
        dispatchFields({
          path: `${presetBasePath}.crop.y`,
          type: 'UPDATE',
          value: presetVal.crop?.y,
        });
        dispatchFields({
          path: `${presetBasePath}.crop.zoom`,
          type: 'UPDATE',
          value: presetVal.crop?.zoom,
        });
        dispatchFields({
          path: `${presetBasePath}.derivative`,
          type: 'UPDATE',
          value: presetVal.derivative ?? null,
        });
        dispatchFields({
          path: `${presetBasePath}.state`,
          type: 'UPDATE',
          value: presetVal.state,
        });
        dispatchFields({
          path: `${presetBasePath}.fingerprint`,
          type: 'UPDATE',
          value: presetVal.fingerprint,
        });
        dispatchFields({
          path: `${presetBasePath}.lastGeneratedAt`,
          type: 'UPDATE',
          value: presetVal.lastGeneratedAt,
        });
        dispatchFields({
          path: `${presetBasePath}.sourceVersion`,
          type: 'UPDATE',
          value: presetVal.sourceVersion,
        });
        dispatchFields({
          path: `${presetBasePath}.lastError`,
          type: 'UPDATE',
          value: presetVal.lastError,
        });
      }

      syncDocumentData(nextValue, serverDoc);
    },
    [dispatchFields, path, presets, syncDocumentData],
  );

  // Generate all stale or missing
  const [generatingAll, setGeneratingAll] = useState(false);

  // Transient error state keyed by preset key. Shown inline on each card until
  // cleared by a successful generation or a source/crop change that
  // invalidates the old error context.
  const [transientErrors, setTransientErrors] = useState<
    Record<string, string>
  >({});

  const fingerprintSnapshot = useMemo(
    () =>
      Object.fromEntries(
        presets.map((preset) => [
          preset.key,
          fieldValue?.presets?.[preset.key]?.fingerprint,
        ]),
      ) as Record<string, string | undefined>,
    [fieldValue?.presets, presets],
  );
  const prevSourceIDRef = useRef(sourceID);
  const prevFingerprintSnapshotRef = useRef(fingerprintSnapshot);

  useEffect(() => {
    if (prevSourceIDRef.current !== sourceID) {
      prevSourceIDRef.current = sourceID;
      setTransientErrors({});
      dispatchFields({
        path: `${path}.presets`,
        type: 'REMOVE',
      });

      // Remove all preset nested form fields so stale state from the previous
      // source image does not linger in the admin UI.
      for (const preset of presets) {
        removePresetFormFields(dispatchFields, `${path}.presets.${preset.key}`);
      }

      // Synchronize the root group field entry and documentInfo.setData so
      // the parent form state reflects the new source without stale
      // derivative/preset data.
      const nextRootValue: ImageTransformFieldValue = sourceValue
        ? { source: sourceValue }
        : {};

      dispatchFields({
        formState: {
          [path]: {
            ...(rootFieldState ?? {}),
            value: nextRootValue,
          },
        },
        type: 'UPDATE_MANY',
      });
      syncDocumentData(nextRootValue);
    }
  }, [
    dispatchFields,
    path,
    presets,
    rootFieldState,
    sourceID,
    sourceValue,
    syncDocumentData,
  ]);

  useEffect(() => {
    const previousSnapshot = prevFingerprintSnapshotRef.current;
    const changedKeys = Object.keys(fingerprintSnapshot).filter(
      (key) => previousSnapshot[key] !== fingerprintSnapshot[key],
    );

    if (changedKeys.length > 0) {
      setTransientErrors((prev) => {
        let changed = false;
        const next = { ...prev };

        for (const key of changedKeys) {
          if (key in next) {
            delete next[key];
            changed = true;
          }
        }

        return changed ? next : prev;
      });
    }

    prevFingerprintSnapshotRef.current = fingerprintSnapshot;
  }, [fingerprintSnapshot]);

  /** Merge server-returned errors into transient state and clear errors for
   *  presets that succeeded. Called after both single and batch generation. */
  const handleGenerationComplete = useCallback(
    (result: GenerationResult, requestedKeys: readonly string[]) => {
      setTransientErrors((prev) => {
        const next = { ...prev };

        // Clear errors for presets that were requested and succeeded.
        for (const key of requestedKeys) {
          if (!result.errors[key]) {
            delete next[key];
          }
        }

        // Set errors for presets that failed.
        for (const [key, message] of Object.entries(result.errors)) {
          if (message) {
            next[key] = message;
          }
        }

        return next;
      });
    },
    [],
  );

  const handleGenerationError = useCallback(
    (message: string, requestedKeys: readonly string[]) => {
      setTransientErrors((prev) => {
        const next = { ...prev };

        for (const key of requestedKeys) {
          next[key] = message;
        }

        return next;
      });
    },
    [],
  );

  const staleOrMissingKeys = useMemo(() => {
    const keys: string[] = [];

    for (const preset of presets) {
      const presetVal = fieldValue?.presets?.[preset.key];
      const state = presetVal?.state;

      if (
        !state ||
        state === 'missing' ||
        state === 'stale' ||
        state === 'failed'
      ) {
        keys.push(preset.key);
      }
    }

    return keys;
  }, [fieldValue?.presets, presets]);

  const defaultOpenPresetKey = useMemo(() => {
    const priorityPreset = presets.find((preset) => {
      const presetState = fieldValue?.presets?.[preset.key]?.state;

      return (
        transientErrors[preset.key] ||
        presetState === 'failed' ||
        presetState === 'generating' ||
        presetState === 'missing' ||
        presetState === 'stale' ||
        !presetState
      );
    });

    return priorityPreset?.key ?? presets[0]?.key;
  }, [fieldValue?.presets, presets, transientErrors]);

  const handleGenerateAll = useCallback(async () => {
    if (staleOrMissingKeys.length === 0) {
      return;
    }

    setGeneratingAll(true);

    try {
      const body: Record<string, unknown> = {
        action: 'generate',
        dataPath,
        fieldValue,
        presetKeys: staleOrMissingKeys,
        schemaPath,
      };

      if (collectionSlug) {
        body.collectionSlug = collectionSlug;
      }

      if (globalSlug) {
        body.globalSlug = globalSlug;
      }

      if (ownerId !== undefined) {
        body.id = ownerId;
      }

      const response = await fetch(`${apiUrl}/image-transform`, {
        body: JSON.stringify(body),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as {
          error?: string;
        };

        throw new Error(
          errorData.error ?? `Generation failed (${response.status})`,
        );
      }

      const result = (await response.json()) as GenerationResult;

      handleFieldValueUpdate(result.value, result.doc);
      handleGenerationComplete(result, staleOrMissingKeys);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Derivative generation failed.';

      handleGenerationError(message, staleOrMissingKeys);
      console.error('[ImageTransform] Generate all error:', error);
    } finally {
      setGeneratingAll(false);
    }
  }, [
    apiUrl,
    collectionSlug,
    dataPath,
    fieldValue,
    globalSlug,
    handleFieldValueUpdate,
    handleGenerationComplete,
    handleGenerationError,
    ownerId,
    schemaPath,
    staleOrMissingKeys,
  ]);

  // Render the source upload via RenderFields to leverage Payload's built-in upload component
  const sourceFields = useMemo((): ClientField[] => {
    const sourceField = field.fields?.find(
      (f: ClientField) => 'name' in f && f.name === 'source',
    );

    if (!sourceField) {
      return [];
    }

    // Unhide the source field for rendering
    return [
      {
        ...sourceField,
        admin: {
          ...sourceField.admin,
          hidden: false,
        },
      } as ClientField,
    ];
  }, [field.fields]);

  const nestedPermissions =
    permissions === true
      ? true
      : permissions &&
          typeof permissions === 'object' &&
          'fields' in permissions
        ? (permissions.fields ?? true)
        : true;

  return (
    <div className={styles.fieldWrap}>
      <div className={styles.fieldHeader}>
        <FieldLabel label={label} />
        {description ? (
          <FieldDescription description={description} path={path} />
        ) : null}
      </div>

      {/* Source Upload */}
      <div className={styles.sourceWrap}>
        {sourceFields.length > 0 ? (
          <RenderFields
            fields={sourceFields}
            forceRender
            margins={false}
            parentIndexPath=""
            parentPath={path}
            parentSchemaPath={schemaPathFromProps ?? path}
            permissions={nestedPermissions}
          />
        ) : null}
      </div>

      {/* Presets Section */}
      {hasSource ? (
        <>
          {/* Generate all action */}
          {staleOrMissingKeys.length > 0 ? (
            <div className={styles.generateAllWrap}>
              <button
                className={styles.generateAllBtn}
                disabled={cannotGenerate || generatingAll}
                onClick={handleGenerateAll}
                type="button"
              >
                {generatingAll
                  ? 'Generating\u2026'
                  : `Generate all stale or missing (${staleOrMissingKeys.length})`}
              </button>
              {cannotGenerate && disabledReason ? (
                <p className={styles.disabledHint}>{disabledReason}</p>
              ) : null}
            </div>
          ) : null}

          {/* Preset cards */}
          <div className={styles.presetList}>
            {presets.map((preset) => (
              <PresetCard
                key={preset.key}
                apiUrl={apiUrl}
                collectionSlug={collectionSlug}
                dataPath={dataPath}
                defaultOpen={
                  presets.length === 1 || preset.key === defaultOpenPresetKey
                }
                derivativeCollectionSlug={derivativeCollectionSlug}
                disabled={cannotGenerate}
                disabledReason={disabledReason}
                fieldValue={fieldValue}
                globalSlug={globalSlug}
                onFieldValueUpdate={handleFieldValueUpdate}
                onGenerationComplete={handleGenerationComplete}
                onGenerationError={handleGenerationError}
                ownerId={ownerId}
                path={path}
                preset={preset}
                presetValue={fieldValue?.presets?.[preset.key] ?? undefined}
                schemaPath={schemaPath}
                sourceUrl={sourceUrl}
                transientError={transientErrors[preset.key]}
              />
            ))}
          </div>
        </>
      ) : presets.length > 0 ? (
        <p className={styles.noSourceHint}>
          Select a source image above to configure crop presets.
        </p>
      ) : null}
    </div>
  );
};
