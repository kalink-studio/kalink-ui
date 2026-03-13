import { styleVariants } from '@vanilla-extract/css';

import { base } from './layers.css';
import {
  sys,
  type TypographySize,
  type TypographyVariant,
} from './system-contract.css';

export const typography = Object.entries(sys.typography).reduce(
  (acc, [variant, sizes]) => {
    return {
      ...acc,
      [variant]: styleVariants(sizes, (typeToken) => {
        return {
          '@layer': {
            [base]: {
              fontFamily: typeToken.font,
              fontWeight: typeToken.weight,
              lineHeight: typeToken.lineHeight,
              letterSpacing: typeToken.tracking,
              fontSize: typeToken.size,
            },
          },
        };
      }),
    };
  },
  {} as Record<TypographyVariant, Record<TypographySize, string>>,
);
