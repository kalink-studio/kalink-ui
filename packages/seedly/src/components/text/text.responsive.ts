import {
  defaultOrder,
  resolveResponsive,
  responsiveRecipe,
  TypographySize,
  TypographyVariant,
  type BreakpointWithBase,
  type Responsive,
} from '../../styles';

import { alignAt, textRecipe, typographyAt } from './text.css';

export const textResponsive = responsiveRecipe({
  recipe: textRecipe,
  at: { align: alignAt },
  order: defaultOrder,
});

export function buildTypographyOverrides(opts: {
  variant?: Responsive<TypographyVariant>;
  size?: Responsive<TypographySize>;
}) {
  const { variant, size } = opts;
  const varMap = resolveResponsive<TypographyVariant, BreakpointWithBase>(
    variant,
    defaultOrder,
  );
  const sizeMap = resolveResponsive<TypographySize, BreakpointWithBase>(
    size,
    defaultOrder,
  );

  // Carry forward variant/size values across breakpoints so that
  // a value set at md persists to lg/xl/... unless overridden again.
  let currentVariant = varMap.xs ?? (variant as TypographyVariant | undefined);
  let currentSize = sizeMap.xs ?? (size as TypographySize | undefined);

  const classes: string[] = [];

  for (const bp of defaultOrder) {
    if (bp === 'xs') {
      continue;
    }

    if (varMap[bp] != null) {
      currentVariant = varMap[bp];
    }

    if (sizeMap[bp] != null) {
      currentSize = sizeMap[bp];
    }

    if (currentVariant && currentSize) {
      const key = `${String(currentVariant)}.${String(currentSize)}`;
      const cls = (
        typographyAt as Record<
          Exclude<BreakpointWithBase, 'xs'>,
          Record<string, string>
        >
      )[bp]?.[key];

      if (cls) {
        classes.push(cls);
      }
    }
  }

  return classes;
}
