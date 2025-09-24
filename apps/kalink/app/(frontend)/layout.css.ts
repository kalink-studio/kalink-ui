import { style } from '@vanilla-extract/css';

import '@/styles/ref.css.ts';
import '@/styles/globals.css.ts';

import { vars } from '@/styles/contract.css';
import { typography } from '@/styles/typography.css';

export const html = style({
  minHeight: '100vh',
});

export const body = style([
  typography.bodyLarge,
  {
    display: 'flex',
    flexDirection: 'column',

    minHeight: '100vh',
  },
]);

export const skipLink = style({
  position: 'fixed',
  insetInlineStart: '1.5rem',
  insetBlockStart: '1.5rem',
  paddingBlock: '0.75rem',
  paddingInline: '1.25rem',
  zIndex: 110,
  backgroundColor: vars.system.color.primary,
  color: vars.system.color.onPrimary,
  borderRadius: vars.ref.radius.default,
  transform: 'translateY(-200%)',
  transition: 'transform 150ms ease',
  selectors: {
    '&:focus-visible': {
      transform: 'translateY(0)',
    },
  },
});

export const main = style({
  flex: 1,
});
