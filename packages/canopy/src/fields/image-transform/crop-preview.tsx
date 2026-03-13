'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  computeNormalisedCrop,
  getEffectiveZoom,
  parseAspectRatio,
  ZOOM_MAX,
  ZOOM_MIN,
  ZOOM_STEP,
} from './crop-math.js';
import { GridOverlay } from './grid-overlay.js';
import styles from './image-transform-field.module.css';

import type { ImageTransformCrop } from './types.js';

export interface CropPreviewProps {
  readonly aspectRatio: string;
  readonly crop: ImageTransformCrop;
  readonly naturalSize: { h: number; w: number } | null;
  readonly onCropChange: (crop: ImageTransformCrop) => void;
  readonly onNaturalSize: (size: { h: number; w: number }) => void;
  readonly sourceUrl: string;
}

export const CropPreview: React.FC<CropPreviewProps> = ({
  aspectRatio,
  crop,
  naturalSize,
  onCropChange,
  onNaturalSize,
  sourceUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const startRef = useRef({ clientX: 0, clientY: 0, x: crop.x, y: crop.y });
  const parsed = parseAspectRatio(aspectRatio);
  const ratio = parsed ? parsed.width / parsed.height : 16 / 9;

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      onNaturalSize({ h: img.naturalHeight, w: img.naturalWidth });
    };

    img.src = sourceUrl;
  }, [onNaturalSize, sourceUrl]);

  const [containerSize, setContainerSize] = useState<{
    h: number;
    w: number;
  } | null>(null);

  useEffect(() => {
    const el = containerRef.current;

    if (!el) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      setContainerSize({
        h: entry.contentRect.height,
        w: entry.contentRect.width,
      });
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const imgStyle = useMemo((): React.CSSProperties => {
    if (!naturalSize || !containerSize || containerSize.w === 0) {
      return {};
    }

    const normCrop = computeNormalisedCrop({
      aspectRatio: ratio,
      crop,
      naturalHeight: naturalSize.h,
      naturalWidth: naturalSize.w,
    });

    const displayScale = containerSize.w / (normCrop.width * naturalSize.w);
    const scale = displayScale * (naturalSize.w / containerSize.w);
    const tx = -normCrop.left * naturalSize.w * displayScale;
    const ty = -normCrop.top * naturalSize.h * displayScale;

    return {
      transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
    };
  }, [containerSize, crop, naturalSize, ratio]);

  const clampCropXY = useCallback(
    (rawX: number, rawY: number): { x: number; y: number } => {
      if (!naturalSize) {
        return {
          x: Math.max(0, Math.min(100, rawX)),
          y: Math.max(0, Math.min(100, rawY)),
        };
      }

      const zoom = getEffectiveZoom({
        aspectRatio: ratio,
        naturalHeight: naturalSize.h,
        naturalWidth: naturalSize.w,
        zoom: crop.zoom,
      });
      const maxW = Math.floor(naturalSize.w / zoom);
      const maxH = Math.floor(naturalSize.h / zoom);
      const cropW = Math.max(1, Math.min(maxW, Math.floor(maxH * ratio)));
      const cropH = Math.max(1, Math.floor(cropW / ratio));

      const halfW = cropW / 2;
      const halfH = cropH / 2;
      const minXPct = (halfW / naturalSize.w) * 100;
      const maxXPct = ((naturalSize.w - halfW) / naturalSize.w) * 100;
      const minYPct = (halfH / naturalSize.h) * 100;
      const maxYPct = ((naturalSize.h - halfH) / naturalSize.h) * 100;

      return {
        x: Math.round(Math.max(minXPct, Math.min(maxXPct, rawX))),
        y: Math.round(Math.max(minYPct, Math.min(maxYPct, rawY))),
      };
    },
    [crop.zoom, naturalSize, ratio],
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const el = containerRef.current;

      if (!el) {
        return;
      }

      el.setPointerCapture(event.pointerId);
      draggingRef.current = true;
      setIsDragging(true);
      startRef.current = {
        clientX: event.clientX,
        clientY: event.clientY,
        x: crop.x,
        y: crop.y,
      };
    },
    [crop.x, crop.y],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (
        !draggingRef.current ||
        !containerRef.current ||
        !naturalSize ||
        !containerSize
      ) {
        return;
      }

      event.stopPropagation();

      const normCrop = computeNormalisedCrop({
        aspectRatio: ratio,
        crop,
        naturalHeight: naturalSize.h,
        naturalWidth: naturalSize.w,
      });
      const displayScale = containerSize.w / (normCrop.width * naturalSize.w);

      const dxNat = (event.clientX - startRef.current.clientX) / displayScale;
      const dyNat = (event.clientY - startRef.current.clientY) / displayScale;
      const dxPct = (dxNat / naturalSize.w) * 100;
      const dyPct = (dyNat / naturalSize.h) * 100;

      const rawX = startRef.current.x - dxPct;
      const rawY = startRef.current.y - dyPct;
      const { x: nextX, y: nextY } = clampCropXY(rawX, rawY);

      onCropChange({ x: nextX, y: nextY, zoom: crop.zoom });
    },
    [clampCropXY, containerSize, crop, naturalSize, onCropChange, ratio],
  );

  const handlePointerUp = useCallback((event: React.PointerEvent) => {
    event.stopPropagation();
    draggingRef.current = false;
    setIsDragging(false);
    const el = containerRef.current;

    if (el) {
      el.releasePointerCapture(event.pointerId);
    }
  }, []);

  const handlePointerCancel = useCallback((event: React.PointerEvent) => {
    event.stopPropagation();
    draggingRef.current = false;
    setIsDragging(false);
    const el = containerRef.current;

    if (el) {
      el.releasePointerCapture(event.pointerId);
    }
  }, []);

  const handleDragStart = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaY > 0 ? ZOOM_STEP : -ZOOM_STEP;
      const nextZoom =
        Math.round(
          Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, crop.zoom + delta)) * 10,
        ) / 10;

      if (nextZoom !== crop.zoom) {
        onCropChange({ ...crop, zoom: nextZoom });
      }
    },
    [crop, onCropChange],
  );

  useEffect(() => {
    const el = containerRef.current;

    if (!el) {
      return;
    }

    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  return (
    <div
      ref={containerRef}
      aria-label="Crop preview. Drag to reposition, scroll to zoom."
      className={styles.cropContainer}
      data-dragging={isDragging}
      draggable={false}
      onDragStart={handleDragStart}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="application"
      style={
        {
          '--crop-ratio': `${ratio}`,
        } as React.CSSProperties
      }
    >
      <img
        alt="Crop preview"
        className={styles.cropImg}
        draggable={false}
        onDragStart={handleDragStart}
        src={sourceUrl}
        style={imgStyle}
      />
      <GridOverlay />
    </div>
  );
};
