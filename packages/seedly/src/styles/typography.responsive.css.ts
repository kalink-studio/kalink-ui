import { type StyleRule } from '@vanilla-extract/css';

import { base } from './layers.css';
import { createResponsiveVariants, defaultMedia } from './responsive';
import { sys } from './system-contract.css';

const typographyComboEntries = Object.entries(sys.typography).flatMap(
  ([variantKey, sizes]) => {
    return Object.entries(sizes).map(([sizeKey, value]) => {
      const key = `${variantKey}.${sizeKey}`;

      const rule: StyleRule = {
        '@layer': {
          [base]: {
            fontFamily: value.font,
            fontWeight: value.weight,
            lineHeight: value.lineHeight,
            letterSpacing: value.tracking,
            fontSize: value.size,
          },
        },
      };

      return [key, rule] as const;
    });
  },
);

export const typographyAt = createResponsiveVariants({
  styles: Object.fromEntries(typographyComboEntries) as Record<
    string,
    StyleRule
  >,
  media: defaultMedia,
});
