'use client';

import React from 'react';

import { parseAspectRatio } from './crop-math';
import styles from './image-transform-field.module.css';
import { useDerivativeUrl } from './use-derivative-url';

import type { ImageTransformRelationValue } from './types';

const THUMB_SLOT_W = 56;
const THUMB_SLOT_H = 56;

export interface HeaderThumbnailProps {
  readonly apiUrl: string;
  readonly aspectRatio: string;
  readonly derivative: ImageTransformRelationValue | undefined;
  readonly derivativeCollectionSlug: string | undefined;
  readonly hasDerivative: boolean;
  readonly isReady: boolean;
}

export const HeaderThumbnail: React.FC<HeaderThumbnailProps> = ({
  apiUrl,
  aspectRatio,
  derivative,
  derivativeCollectionSlug,
  hasDerivative,
  isReady,
}) => {
  const url = useDerivativeUrl(
    hasDerivative && isReady ? derivative : undefined,
    derivativeCollectionSlug,
    apiUrl,
  );

  const parsed = parseAspectRatio(aspectRatio);
  const ratio = parsed ? parsed.width / parsed.height : 16 / 9;

  // Compute the largest dimensions that fit within the slot while preserving
  // the preset aspect ratio so the thumbnail shape communicates the ratio.
  const innerW =
    ratio >= THUMB_SLOT_W / THUMB_SLOT_H
      ? THUMB_SLOT_W
      : Math.round(THUMB_SLOT_H * ratio);
  const innerH =
    ratio >= THUMB_SLOT_W / THUMB_SLOT_H
      ? Math.round(THUMB_SLOT_W / ratio)
      : THUMB_SLOT_H;

  return (
    <div aria-hidden={!url} className={styles.thumbSlot}>
      <div
        className={styles.thumbInner}
        style={
          {
            '--thumb-height': `${innerH}px`,
            '--thumb-width': `${innerW}px`,
          } as React.CSSProperties
        }
      >
        {url ? (
          <img alt="Derivative preview" className={styles.thumbImg} src={url} />
        ) : null}
      </div>
    </div>
  );
};
