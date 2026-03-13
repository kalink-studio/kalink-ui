import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

export const testimonialsSection = recipe({
  base: {
    paddingBlock: vars.ref.spacing['6xl'],
  },
});

export const testimonialsGrid = recipe({
  base: {
    display: 'grid',
    gap: vars.ref.spacing['3xl'],
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  },
});

export const testimonialCard = recipe({
  base: {
    display: 'grid',
    gap: vars.ref.spacing.md,
    padding: vars.ref.spacing['2xl'],
    color: vars.system.color.onSurface,
    backgroundColor: vars.system.color.surfaceContainer,
    borderRadius: vars.ref.radius.rounded,
  },
});

export const testimonialQuote = recipe({
  base: {
    position: 'relative',
    fontStyle: 'italic',
  },
});
