import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

export const fiftyFiftySection = recipe({
  base: {
    paddingBlock: vars.ref.spacing['6xl'],
  },
});

export const fiftyFiftyLayout = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: vars.ref.spacing['3xl'],
  },
  variants: {
    direction: {
      start: {
        '@media': {
          'screen and (min-width: 768px)': {
            flexDirection: 'row',
          },
        },
      },
      end: {
        '@media': {
          'screen and (min-width: 768px)': {
            flexDirection: 'row-reverse',
          },
        },
      },
    },
  },
});

export const fiftyFiftyMedia = recipe({
  base: {
    position: 'relative',
    flex: 1,
    minHeight: '320px',
    borderRadius: vars.ref.radius.rounded,
    overflow: 'hidden',
  },
});

export const fiftyFiftyContent = recipe({
  base: {
    flex: 1,
    display: 'grid',
    gap: vars.ref.spacing['lg'],
  },
});
