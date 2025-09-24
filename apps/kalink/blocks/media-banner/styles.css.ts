import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

export const mediaBannerSection = recipe({
  base: {
    paddingBlock: vars.ref.spacing['6xl'],
  },
});

export const mediaBannerItem = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: vars.ref.spacing['3xl'],
    alignItems: 'stretch',
    marginBlockEnd: vars.ref.spacing['4xl'],
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

export const mediaBannerText = recipe({
  base: {
    display: 'grid',
    gap: vars.ref.spacing['lg'],
    flex: 1,
  },
});

export const mediaBannerFigure = recipe({
  base: {
    width: '100%',
    position: 'relative',
    borderRadius: vars.ref.radius.rounded,
    overflow: 'hidden',
    flex: 1,
  },
});
