'use client';

import React from 'react';

import styles from './image-transform-field.module.css';

import type { ImageTransformState } from './types';

const STATE_LABELS: Record<ImageTransformState, string> = {
  failed: 'Failed',
  generating: 'Generating…',
  missing: 'Missing',
  ready: 'Ready',
  stale: 'Stale',
  unsaved: 'Unsaved',
};

export interface StatusBadgeProps {
  readonly state: ImageTransformState;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ state }) => (
  <span className={styles.badge} data-state={state}>
    {STATE_LABELS[state]}
  </span>
);
