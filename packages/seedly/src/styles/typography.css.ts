import { styleVariants } from '@vanilla-extract/css';

import { base } from './layers.css';
import { sys, TypographySize, TypographyVariant } from './system-contract.css';

export const typography = Object.entries(sys.typography).reduce(
  (acc, [key, value]) => {
    return {
      ...acc,
      [key]: styleVariants(value, (variant) => {
        return {
          '@layer': {
            [base]: {
              fontFamily: variant.font,
              fontWeight: variant.weight,
              lineHeight: variant.lineHeight,
              letterSpacing: variant.tracking,
              fontSize: variant.size,
            },
          },
        };
      }),
    };
  },
  {} as Record<TypographyVariant, Record<TypographySize, string>>,
);
