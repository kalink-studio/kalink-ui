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
    gap: vars.ref.spacing['3xl'],
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
});

export const teamCard = recipe({
  base: {
    display: 'grid',
    gap: vars.ref.spacing.md,
    backgroundColor: vars.system.color.surfaceContainer,
    color: vars.system.color.onSurface,
    borderRadius: vars.ref.radius.rounded,
    overflow: 'hidden',
  },
});

export const teamFigure = recipe({
  base: {
    position: 'relative',
    width: '100%',
    paddingBlockEnd: '125%',
  },
});

export const teamCardBody = recipe({
  base: {
    display: 'grid',
    gap: vars.ref.spacing.sm,
    padding: vars.ref.spacing['2xl'],
  },
});
