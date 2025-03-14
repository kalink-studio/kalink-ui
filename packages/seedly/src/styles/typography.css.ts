import { styleVariants } from '@vanilla-extract/css';

import { sys } from './system-contract.css';

type TypographySize = 'large' | 'medium' | 'small';

export const typography = Object.entries(sys.typography).reduce(
  (acc, [key, value]) => {
    return {
      ...acc,
      [key]: styleVariants(value, (variant) => {
        return {
          fontFamily: variant.font,
          fontWeight: variant.weight,
          lineHeight: variant.lineHeight,
          letterSpacing: variant.tracking,
          fontSize: variant.size,
        };
      }),
    };
  },
  {} as Record<keyof typeof sys.typography, Record<TypographySize, string>>,
);
