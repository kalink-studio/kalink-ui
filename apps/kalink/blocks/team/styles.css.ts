import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

export const teamSection = recipe({
  base: {
    paddingBlock: vars.ref.spacing['6xl'],
  },
});

export const teamGrid = recipe({
  base: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: vars.ref.spacing['3xl'],
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
});

export const teamCard = recipe({
  base: {
    display: 'grid',
    gap: vars.ref.spacing.md,
    overflow: 'hidden',
    color: vars.system.color.onSurface,
    backgroundColor: vars.system.color.surfaceContainer,
    borderRadius: vars.ref.radius.rounded,
  },
});

export const teamFigure = recipe({
  base: {
    width: '100%',
    paddingBlockEnd: '125%',
    position: 'relative',
  },
});

export const teamCardBody = recipe({
  base: {
    display: 'grid',
    gap: vars.ref.spacing.sm,
    padding: vars.ref.spacing['2xl'],
  },
});
