import type { ImageTransformCrop } from './types';

export const ZOOM_MIN = 1;
export const ZOOM_MAX = 5;
export const ZOOM_STEP = 0.1;

export const DEFAULT_CROP: ImageTransformCrop = { x: 50, y: 50, zoom: 1 };

export const parseAspectRatio = (
  ratio: string,
): { height: number; width: number } | undefined => {
  const parts = ratio.split(/[:/x]/);

  if (parts.length !== 2) {
    return undefined;
  }

  const width = Number(parts[0]);
  const height = Number(parts[1]);

  if (!Number.isFinite(width) || !Number.isFinite(height) || height === 0) {
    return undefined;
  }

  return { height, width };
};

/**
 * Replicate `getEffectiveZoom` from generate-derivative.ts.
 */
export const getEffectiveZoom = ({
  aspectRatio,
  naturalHeight,
  naturalWidth,
  zoom,
}: {
  aspectRatio: number;
  naturalHeight: number;
  naturalWidth: number;
  zoom: number;
}): number => {
  const imageAspect = naturalHeight / naturalWidth;
  const coverScale = Math.max(1, 1 / (aspectRatio * imageAspect));

  return Math.max(1, zoom / coverScale);
};

/**
 * Replicate `computeCropRegion` from generate-derivative.ts and return the
 * crop box in normalised [0-1] coordinates.
 */
export const computeNormalisedCrop = ({
  aspectRatio,
  crop,
  naturalHeight,
  naturalWidth,
}: {
  aspectRatio: number;
  crop: ImageTransformCrop;
  naturalHeight: number;
  naturalWidth: number;
}): { height: number; left: number; top: number; width: number } => {
  const zoom = getEffectiveZoom({
    aspectRatio,
    naturalHeight,
    naturalWidth,
    zoom: crop.zoom,
  });
  const maxW = Math.floor(naturalWidth / zoom);
  const maxH = Math.floor(naturalHeight / zoom);
  const cropW = Math.max(1, Math.min(maxW, Math.floor(maxH * aspectRatio)));
  const cropH = Math.max(1, Math.floor(cropW / aspectRatio));
  const centerX = Math.round((crop.x / 100) * naturalWidth);
  const centerY = Math.round((crop.y / 100) * naturalHeight);
  let left = centerX - Math.round(cropW / 2);
  let top = centerY - Math.round(cropH / 2);

  left = Math.max(0, Math.min(left, naturalWidth - cropW));
  top = Math.max(0, Math.min(top, naturalHeight - cropH));

  return {
    height: cropH / naturalHeight,
    left: left / naturalWidth,
    top: top / naturalHeight,
    width: cropW / naturalWidth,
  };
};

export const computeCropBounds = ({
  aspectRatio,
  naturalHeight,
  naturalWidth,
  zoom,
}: {
  aspectRatio: number;
  naturalHeight: number;
  naturalWidth: number;
  zoom: number;
}): { maxX: number; maxY: number; minX: number; minY: number } => {
  const effZoom = getEffectiveZoom({
    aspectRatio,
    naturalHeight,
    naturalWidth,
    zoom,
  });
  const maxW = Math.floor(naturalWidth / effZoom);
  const maxH = Math.floor(naturalHeight / effZoom);
  const cropW = Math.max(1, Math.min(maxW, Math.floor(maxH * aspectRatio)));
  const cropH = Math.max(1, Math.floor(cropW / aspectRatio));

  const halfW = cropW / 2;
  const halfH = cropH / 2;
  const minX = Math.round((halfW / naturalWidth) * 100);
  const maxX = Math.round(((naturalWidth - halfW) / naturalWidth) * 100);
  const minY = Math.round((halfH / naturalHeight) * 100);
  const maxY = Math.round(((naturalHeight - halfH) / naturalHeight) * 100);

  return {
    maxX: Math.max(minX, maxX),
    maxY: Math.max(minY, maxY),
    minX: Math.min(minX, maxX),
    minY: Math.min(minY, maxY),
  };
};

export const clampCrop = ({
  aspectRatio,
  crop,
  naturalSize,
}: {
  aspectRatio: number;
  crop: ImageTransformCrop;
  naturalSize: { h: number; w: number } | null;
}): ImageTransformCrop => {
  const zoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, crop.zoom));

  if (!naturalSize) {
    return {
      x: Math.max(0, Math.min(100, crop.x)),
      y: Math.max(0, Math.min(100, crop.y)),
      zoom,
    };
  }

  const bounds = computeCropBounds({
    aspectRatio,
    naturalHeight: naturalSize.h,
    naturalWidth: naturalSize.w,
    zoom,
  });

  return {
    x: Math.max(bounds.minX, Math.min(bounds.maxX, crop.x)),
    y: Math.max(bounds.minY, Math.min(bounds.maxY, crop.y)),
    zoom,
  };
};

export const cropsEqual = (
  a: ImageTransformCrop,
  b: ImageTransformCrop,
): boolean => a.x === b.x && a.y === b.y && a.zoom === b.zoom;
