'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from './image-transform-field.module.css';

export interface OverflowMenuProps {
  readonly disabled: boolean;
  readonly onClearDerivative: () => void;
}

export const OverflowMenu: React.FC<OverflowMenuProps> = ({
  disabled,
  onClearDerivative,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClear = useCallback(() => {
    setOpen(false);
    onClearDerivative();
  }, [onClearDerivative]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false);
      buttonRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={menuRef} className={styles.overflowWrap}>
      <button
        ref={buttonRef}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="More actions"
        className={styles.overflowBtn}
        data-open={open}
        disabled={disabled}
        onClick={toggle}
        type="button"
      >
        <svg
          aria-hidden="true"
          fill="currentColor"
          height="14"
          viewBox="0 0 24 24"
          width="14"
        >
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {open ? (
        <div
          className={styles.overflowMenu}
          onKeyDown={handleKeyDown}
          role="menu"
        >
          <button
            className={styles.overflowMenuItem}
            onClick={handleClear}
            role="menuitem"
            type="button"
          >
            <svg
              aria-hidden="true"
              fill="none"
              height="12"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="12"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
            Clear derivative
          </button>
        </div>
      ) : null}
    </div>
  );
};
