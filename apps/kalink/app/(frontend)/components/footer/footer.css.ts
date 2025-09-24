import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

export const footer = recipe({
  base: {
    paddingBlock: vars.ref.spacing['5xl'],
  },
  variants: {
    tint: {
      primary: {
        backgroundColor: vars.system.color.primaryContainer,
        color: vars.system.color.onPrimaryContainer,
      },
      secondary: {
        backgroundColor: vars.system.color.secondaryContainer,
        color: vars.system.color.onSecondaryContainer,
      },
    },
  },
  defaultVariants: {
    tint: 'primary',
  },
});

export const socialList = style({
  display: 'flex',
  gap: vars.ref.spacing.md,
});
