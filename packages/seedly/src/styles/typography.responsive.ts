import {
  defaultOrder,
  resolveResponsive,
  type BreakpointWithBase,
  type Responsive,
} from './responsive';
import {
  type TypographySize,
  type TypographyVariant,
} from './system-contract.css';
import { typographyAt } from './typography.responsive.css';

export interface BuildTypographyOverridesOptions {
  variant?: Responsive<TypographyVariant>;
  size?: Responsive<TypographySize>;
}

export function buildTypographyOverrides(
  options: BuildTypographyOverridesOptions,
) {
  const { variant, size } = options;
  const variantMap = resolveResponsive<TypographyVariant, BreakpointWithBase>(
    variant,
    defaultOrder,
  );
  const sizeMap = resolveResponsive<TypographySize, BreakpointWithBase>(
    size,
    defaultOrder,
  );

  let currentVariant =
    variantMap.xs ?? (variant as TypographyVariant | undefined);
  let currentSize = sizeMap.xs ?? (size as TypographySize | undefined);

  const classes: string[] = [];

  for (const breakpoint of defaultOrder) {
    if (breakpoint === 'xs') {
      continue;
    }

    if (variantMap[breakpoint] != null) {
      currentVariant = variantMap[breakpoint];
    }

    if (sizeMap[breakpoint] != null) {
      currentSize = sizeMap[breakpoint];
    }

    if (currentVariant != null && currentSize != null) {
      const key = `${String(currentVariant)}.${String(currentSize)}`;
      const className = (
        typographyAt as Record<
          Exclude<BreakpointWithBase, 'xs'>,
          Record<string, string>
        >
      )[breakpoint]?.[key];

      if (className != null) {
        classes.push(className);
      }
    }
  }

  return classes;
}
