'use client';

import React, { useCallback, useMemo } from 'react';

import { computeCropBounds } from './crop-math';
import cropSliderStyles from './crop-slider.module.css';
import styles from './image-transform-field.module.css';

import type { ImageTransformCrop } from './types';

export interface CropControlsProps {
  readonly aspectRatio: number;
  readonly crop: ImageTransformCrop;
  readonly naturalSize: { h: number; w: number } | null;
  readonly onCropChange: (crop: ImageTransformCrop) => void;
}

interface CropSliderProps {
  readonly label: string;
  readonly max: number;
  readonly min: number;
  readonly onChange: (value: number) => void;
  readonly step: number;
  readonly value: number;
}

const CropSlider: React.FC<CropSliderProps> = ({
  label,
  max,
  min,
  onChange,
  step,
  value,
}) => {
  const handleRangeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = Number(event.target.value);

      if (Number.isFinite(parsed)) {
        onChange(parsed);
      }
    },
    [onChange],
  );

  const handleNumberChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = Number(event.target.value);

      if (Number.isFinite(parsed)) {
        onChange(Math.max(min, Math.min(max, parsed)));
      }
    },
    [max, min, onChange],
  );

  // Compute progress percentage for the WebKit track gradient fill.
  // Firefox uses ::-moz-range-progress instead so it does not need this.
  const range = max - min;
  const progressPct = range > 0 ? ((value - min) / range) * 100 : 0;
  const trackBg = `linear-gradient(to right, var(--theme-elevation-500, #888) ${String(progressPct)}%, var(--theme-elevation-200, #e5e5e5) ${String(progressPct)}%)`;

  return (
    <div className={styles.sliderRow}>
      <span className={styles.sliderLabel}>{label}</span>
      <input
        aria-label={label}
        className={cropSliderStyles.slider}
        max={max}
        min={min}
        onChange={handleRangeChange}
        step={step}
        style={
          {
            '--_slider-track-bg': trackBg,
          } as React.CSSProperties
        }
        type="range"
        value={value}
      />
      <input
        aria-label={`${label} value`}
        className={`${cropSliderStyles.number} ${styles.sliderNumber}`}
        max={max}
        min={min}
        onChange={handleNumberChange}
        step={step}
        type="number"
        value={value}
      />
    </div>
  );
};

export const CropControls: React.FC<CropControlsProps> = ({
  aspectRatio,
  crop,
  naturalSize,
  onCropChange,
}) => {
  const bounds = useMemo(() => {
    if (!naturalSize) {
      return { maxX: 100, maxY: 100, minX: 0, minY: 0 };
    }

    return computeCropBounds({
      aspectRatio,
      naturalHeight: naturalSize.h,
      naturalWidth: naturalSize.w,
      zoom: crop.zoom,
    });
  }, [aspectRatio, crop.zoom, naturalSize]);

  const handleXChange = useCallback(
    (value: number) => {
      onCropChange({ ...crop, x: value });
    },
    [crop, onCropChange],
  );

  const handleYChange = useCallback(
    (value: number) => {
      onCropChange({ ...crop, y: value });
    },
    [crop, onCropChange],
  );

  const handleZoomChange = useCallback(
    (value: number) => {
      onCropChange({ ...crop, zoom: value });
    },
    [crop, onCropChange],
  );

  return (
    <div className={styles.cropControlsWrap}>
      <CropSlider
        label="X"
        max={bounds.maxX}
        min={bounds.minX}
        onChange={handleXChange}
        step={1}
        value={Math.max(bounds.minX, Math.min(bounds.maxX, crop.x))}
      />
      <CropSlider
        label="Y"
        max={bounds.maxY}
        min={bounds.minY}
        onChange={handleYChange}
        step={1}
        value={Math.max(bounds.minY, Math.min(bounds.maxY, crop.y))}
      />
      <CropSlider
        label="Zoom"
        max={5}
        min={1}
        onChange={handleZoomChange}
        step={0.1}
        value={crop.zoom}
      />
    </div>
  );
};
