import { type StyleRule } from '@vanilla-extract/css';

import { components } from './layers.css';
import { createResponsiveVariants, defaultMedia } from './responsive';
import { sys } from './system-contract.css';

const typographyComboEntries = Object.entries(sys.typography).flatMap(
  ([variantKey, sizes]) => {
    return Object.entries(sizes).map(([sizeKey, v]) => {
      const key = `${variantKey}.${sizeKey}`;

      const rule: StyleRule = {
        '@layer': {
          [components]: {
            fontFamily: v.font,
            fontWeight: v.weight,
            lineHeight: v.lineHeight,
            letterSpacing: v.tracking,
            fontSize: v.size,
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
