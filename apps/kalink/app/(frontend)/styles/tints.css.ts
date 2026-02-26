import { styleVariants } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const surfaceTint = styleVariants({
  primary: {
    color: vars.system.color.onPrimary,
    backgroundColor: vars.system.color.primary,
  },
  secondary: {
    color: vars.system.color.onSecondary,
    backgroundColor: vars.system.color.secondary,
  },
  primaryContainer: {
    color: vars.system.color.onPrimaryContainer,
    backgroundColor: vars.system.color.primaryContainer,
  },
  secondaryContainer: {
    color: vars.system.color.onSecondaryContainer,
    backgroundColor: vars.system.color.secondaryContainer,
  },
});
