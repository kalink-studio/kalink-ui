import { styleVariants } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const surfaceTint = styleVariants({
  primary: {
    backgroundColor: vars.system.color.primary,
    color: vars.system.color.onPrimary,
  },
  secondary: {
    backgroundColor: vars.system.color.secondary,
    color: vars.system.color.onSecondary,
  },
  primaryContainer: {
    backgroundColor: vars.system.color.primaryContainer,
    color: vars.system.color.onPrimaryContainer,
  },
  secondaryContainer: {
    backgroundColor: vars.system.color.secondaryContainer,
    color: vars.system.color.onSecondaryContainer,
  },
});
