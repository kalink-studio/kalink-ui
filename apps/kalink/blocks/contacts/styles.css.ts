import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

export const contactsSection = recipe({
  base: {
    paddingBlock: vars.ref.spacing['6xl'],
  },
});

export const contactsLayout = recipe({
  base: {
    display: 'grid',
    gap: vars.ref.spacing['4xl'],
  },
  variants: {
    columns: {
      single: {},
      double: {
        '@media': {
          'screen and (min-width: 1024px)': {
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            alignItems: 'start',
          },
        },
      },
    },
  },
  defaultVariants: {
    columns: 'single',
  },
});

export const contactsInfo = recipe({
  base: {
    display: 'grid',
    gap: vars.ref.spacing['2xl'],
  },
});

export const mapWrapper = recipe({
  base: {
    borderRadius: vars.ref.radius.rounded,
    overflow: 'hidden',
  },
});
