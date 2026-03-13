'use client';

import { useForm } from '@payloadcms/ui';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  clampCrop,
  cropsEqual,
  DEFAULT_CROP,
  parseAspectRatio,
} from './crop-math.js';
import { CropControls } from './crop-controls.js';
import { CropPreview } from './crop-preview.js';
import { HeaderThumbnail } from './header-thumbnail.js';
import styles from './image-transform-field.module.css';
import { OverflowMenu } from './overflow-menu.js';
import { getRelationID } from './relation-utils.js';
import { StatusBadge } from './status-badge.js';

import type { ImageTransformCrop } from './types.js';
import type {
  GenerationResult,
  ImageTransformFieldValue,
  ImageTransformPresetDefinition,
  ImageTransformPresetValue,
  ImageTransformRelationValue,
  ImageTransformState,
} from './types.js';

export interface PresetCardProps {
  readonly apiUrl: string;
  readonly collectionSlug: string | undefined;
  readonly dataPath: string;
  readonly defaultOpen: boolean;
  readonly derivativeCollectionSlug: string | undefined;
  readonly disabled: boolean;
  readonly disabledReason: string | undefined;
  readonly fieldValue: ImageTransformFieldValue;
  readonly globalSlug: string | undefined;
  readonly onFieldValueUpdate: (
    value: ImageTransformFieldValue,
    serverDoc?: Record<string, unknown>,
  ) => void;
  readonly onGenerationComplete: (
    result: GenerationResult,
    presetKeys: readonly string[],
  ) => void;
  readonly onGenerationError: (
    message: string,
    presetKeys: readonly string[],
  ) => void;
  readonly ownerId: number | string | undefined;
  readonly path: string;
  readonly preset: ImageTransformPresetDefinition;
  readonly presetValue: ImageTransformPresetValue | undefined;
  readonly schemaPath: string;
  readonly sourceUrl: string | undefined;
  readonly transientError: string | undefined;
}

export const PresetCard: React.FC<PresetCardProps> = ({
  apiUrl,
  collectionSlug,
  dataPath,
  defaultOpen,
  derivativeCollectionSlug,
  disabled,
  disabledReason,
  fieldValue,
  globalSlug,
  onFieldValueUpdate,
  onGenerationComplete,
  onGenerationError,
  ownerId,
  path,
  preset,
  presetValue,
  schemaPath,
  sourceUrl,
  transientError,
}) => {
  const { dispatchFields, setModified } = useForm();
  const [generating, setGenerating] = useState(false);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [naturalSize, setNaturalSize] = useState<{
    h: number;
    w: number;
  } | null>(null);
  const state: ImageTransformState = presetValue?.state ?? 'missing';
  const crop: ImageTransformCrop = presetValue?.crop ?? DEFAULT_CROP;
  const displayError = transientError ?? presetValue?.lastError;
  const derivativeID = getRelationID(presetValue?.derivative);
  const label = preset.label ?? preset.key;
  const parsed = parseAspectRatio(preset.aspectRatio);
  const ratio = parsed ? parsed.width / parsed.height : 16 / 9;

  const presetPath = `${path}.presets.${preset.key}`;
  const generatedCropRef = useRef<ImageTransformCrop | null>(
    derivativeID && presetValue?.crop ? { ...presetValue.crop } : null,
  );

  const prevGeneratedAtRef = useRef(presetValue?.lastGeneratedAt);

  useEffect(() => {
    const currentGeneratedAt = presetValue?.lastGeneratedAt;

    if (
      currentGeneratedAt &&
      currentGeneratedAt !== prevGeneratedAtRef.current &&
      presetValue?.crop
    ) {
      generatedCropRef.current = { ...presetValue.crop };
    }

    prevGeneratedAtRef.current = currentGeneratedAt;
  }, [presetValue?.lastGeneratedAt, presetValue?.crop]);

  const handleNaturalSize = useCallback((size: { h: number; w: number }) => {
    setNaturalSize(size);
  }, []);

  const updateCropField = useCallback(
    (nextCrop: ImageTransformCrop) => {
      const clampedCrop = clampCrop({
        aspectRatio: ratio,
        crop: nextCrop,
        naturalSize,
      });

      dispatchFields({
        path: `${presetPath}.crop.x`,
        type: 'UPDATE',
        value: clampedCrop.x,
      });
      dispatchFields({
        path: `${presetPath}.crop.y`,
        type: 'UPDATE',
        value: clampedCrop.y,
      });
      dispatchFields({
        path: `${presetPath}.crop.zoom`,
        type: 'UPDATE',
        value: clampedCrop.zoom,
      });
      setModified(true);
    },
    [dispatchFields, naturalSize, presetPath, ratio, setModified],
  );

  const handleGenerate = useCallback(async () => {
    setGenerating(true);

    try {
      const body: Record<string, unknown> = {
        action: 'generate',
        dataPath,
        fieldValue,
        presetKeys: [preset.key],
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

      const generatedPreset = result.value.presets?.[preset.key];

      if (generatedPreset?.crop) {
        generatedCropRef.current = { ...generatedPreset.crop };
      }

      onFieldValueUpdate(result.value, result.doc);
      onGenerationComplete(result, [preset.key]);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Derivative generation failed.';

      onGenerationError(message, [preset.key]);
      console.error('[ImageTransform] Generation error:', error);
    } finally {
      setGenerating(false);
    }
  }, [
    apiUrl,
    collectionSlug,
    dataPath,
    fieldValue,
    globalSlug,
    onFieldValueUpdate,
    onGenerationComplete,
    onGenerationError,
    ownerId,
    preset.key,
    schemaPath,
  ]);

  const handleClearDerivative = useCallback(async () => {
    setGenerating(true);

    try {
      const body: Record<string, unknown> = {
        action: 'clear',
        dataPath,
        fieldValue,
        presetKeys: [preset.key],
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

        throw new Error(errorData.error ?? `Clear failed (${response.status})`);
      }

      const result = (await response.json()) as GenerationResult;

      generatedCropRef.current = null;

      onFieldValueUpdate(result.value, result.doc);
      onGenerationComplete(result, [preset.key]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Derivative clearing failed.';

      onGenerationError(message, [preset.key]);
      console.error('[ImageTransform] Clear derivative error:', error);
    } finally {
      setGenerating(false);
    }
  }, [
    apiUrl,
    collectionSlug,
    dataPath,
    fieldValue,
    globalSlug,
    onFieldValueUpdate,
    onGenerationComplete,
    onGenerationError,
    ownerId,
    preset.key,
    schemaPath,
  ]);

  const handleResetToDefault = useCallback(() => {
    updateCropField(DEFAULT_CROP);
  }, [updateCropField]);

  const handleRevertToGenerated = useCallback(() => {
    if (generatedCropRef.current) {
      updateCropField(generatedCropRef.current);
    }
  }, [updateCropField]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (
      transientError ||
      state === 'failed' ||
      state === 'generating' ||
      state === 'missing' ||
      state === 'stale'
    ) {
      setIsOpen(true);
    }
  }, [state, transientError]);

  const isGenerating = generating || state === 'generating';
  const generateDisabled = disabled || isGenerating;
  const hasDerivative = Boolean(derivativeID);
  const generateLabel = hasDerivative ? 'Regenerate' : 'Generate';
  const hasCropChanges = !cropsEqual(crop, DEFAULT_CROP);

  const canRevertToGenerated =
    hasDerivative &&
    generatedCropRef.current !== null &&
    !cropsEqual(crop, generatedCropRef.current);

  return (
    <div className={styles.presetCard}>
      {/* Accordion header */}
      <button
        aria-expanded={isOpen}
        className={styles.presetHeader}
        data-open={isOpen}
        onClick={toggleOpen}
        type="button"
      >
        <span
          aria-hidden="true"
          className={styles.presetChevron}
          data-open={isOpen}
        >
          {'\u25B6'}
        </span>
        {/* Identity group: thumbnail + name + ratio + badge kept tight */}
        <HeaderThumbnail
          apiUrl={apiUrl}
          aspectRatio={preset.aspectRatio}
          derivative={presetValue?.derivative}
          derivativeCollectionSlug={derivativeCollectionSlug}
          hasDerivative={hasDerivative}
          isReady={state === 'ready'}
        />
        <strong className={styles.presetHeaderLabel}>{label}</strong>
        <span className={styles.presetHeaderRatio}>{preset.aspectRatio}</span>
        <span className={styles.spacer} />
        <StatusBadge state={isGenerating ? 'generating' : state} />
      </button>

      {/* Expanded body */}
      {isOpen ? (
        <div className={styles.presetBody}>
          {sourceUrl ? (
            <div className={styles.presetColumns}>
              {/* Left pane: preview + overflow menu */}
              <div className={styles.presetLeft}>
                <CropPreview
                  aspectRatio={preset.aspectRatio}
                  crop={crop}
                  naturalSize={naturalSize}
                  onCropChange={updateCropField}
                  onNaturalSize={handleNaturalSize}
                  sourceUrl={sourceUrl}
                />
                <div aria-live="polite" className={styles.cropHint}>
                  <span>Drag to pan, scroll to zoom</span>
                  <span>
                    {crop.x}%, {crop.y}%
                    {crop.zoom !== 1 ? ` / ${crop.zoom}x` : ''}
                  </span>
                </div>
              </div>

              {/* Right pane: controls + primary action */}
              <div className={styles.presetRight}>
                {/* Position title row with inline helper actions */}
                <div>
                  <div className={styles.positionTitle}>
                    <span className={styles.positionLabel}>Position</span>
                    <span className={styles.spacer} />
                    {/* Revert to generated — compact ghost button */}
                    <button
                      aria-label="Revert to generated"
                      className={styles.ghostBtn}
                      disabled={!canRevertToGenerated || isGenerating}
                      onClick={handleRevertToGenerated}
                      title="Revert to generated"
                      type="button"
                    >
                      <svg
                        aria-hidden="true"
                        fill="none"
                        height="11"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="11"
                      >
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                      Revert
                    </button>
                    {/* Reset to default — compact ghost button */}
                    <button
                      aria-label="Reset to default"
                      className={styles.ghostBtn}
                      disabled={!hasCropChanges || isGenerating}
                      onClick={handleResetToDefault}
                      title="Reset to default"
                      type="button"
                    >
                      <svg
                        aria-hidden="true"
                        fill="none"
                        height="11"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="11"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" x2="12" y1="8" y2="16" />
                        <line x1="8" x2="16" y1="12" y2="12" />
                      </svg>
                      Reset
                    </button>
                  </div>
                  <CropControls
                    aspectRatio={ratio}
                    crop={crop}
                    naturalSize={naturalSize}
                    onCropChange={updateCropField}
                  />
                </div>

                {/* Divider between sliders and primary action */}
                <div aria-hidden="true" className={styles.divider} />

                {/* Primary action + overflow menu — button group */}
                <div
                  aria-label="Preset actions"
                  className={styles.toolbar}
                  role="toolbar"
                >
                  <button
                    className={styles.generateBtn}
                    disabled={generateDisabled}
                    onClick={handleGenerate}
                    type="button"
                  >
                    {isGenerating ? 'Generating\u2026' : generateLabel}
                  </button>
                  {hasDerivative ? (
                    <OverflowMenu
                      disabled={isGenerating}
                      onClearDerivative={handleClearDerivative}
                    />
                  ) : null}
                </div>

                {generateDisabled && disabledReason ? (
                  <p className={styles.disabledText}>{disabledReason}</p>
                ) : null}
              </div>
            </div>
          ) : null}

          {/* Error display — full width below both columns */}
          {displayError ? (
            <div className={styles.errorBox}>{displayError}</div>
          ) : null}

          {/* Disabled reason when no source (sourceUrl is null) */}
          {!sourceUrl && generateDisabled && disabledReason ? (
            <p
              className={`${styles.disabledText} ${styles.disabledTextSpaced}`}
            >
              {disabledReason}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
