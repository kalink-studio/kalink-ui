'use client';

import React from 'react';

import styles from './image-transform-field.module.css';

export const GridOverlay: React.FC = () => (
  <div aria-hidden="true" className={styles.gridOverlay}>
    <div className={`${styles.gridLineH} ${styles.gridLineHFirst}`} />
    <div className={`${styles.gridLineH} ${styles.gridLineHSecond}`} />
    <div className={`${styles.gridLineV} ${styles.gridLineVFirst}`} />
    <div className={`${styles.gridLineV} ${styles.gridLineVSecond}`} />
    <div className={styles.gridCenter} />
  </div>
);
