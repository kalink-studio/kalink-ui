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
        color: vars.system.color.onPrimaryContainer,
        backgroundColor: vars.system.color.primaryContainer,
      },
      secondary: {
        color: vars.system.color.onSecondaryContainer,
        backgroundColor: vars.system.color.secondaryContainer,
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
