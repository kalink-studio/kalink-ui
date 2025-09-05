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

  const baseVariant = varMap.xs ?? variant;
  const baseSize = sizeMap.xs ?? size;

  const classes: string[] = [];

  for (const bp of defaultOrder) {
    if (bp === 'xs') {
      continue;
    }

    const v = varMap[bp] ?? baseVariant;
    const s = sizeMap[bp] ?? baseSize;

    if (v && s) {
      const key = `${String(v)}.${String(s)}`;
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
