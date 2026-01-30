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

const sizeMap = {
  sm: 'small',
  md: 'medium',
  lg: 'large',
} as const;

type TshirtSize = keyof typeof sizeMap;

function mapResponsiveValue<T, U>(
  value: Responsive<T> | undefined,
  mapper: (input: T) => U,
): Responsive<U> | undefined {
  if (value == null) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.map((entry) =>
      entry == null ? entry : mapper(entry),
    ) as Responsive<U>;
  }

  if (typeof value === 'object') {
    const out: Partial<Record<string, U>> = {};

    for (const [key, entry] of Object.entries(value)) {
      if (entry != null) {
        out[key] = mapper(entry as T);
      }
    }

    return out as Responsive<U>;
  }

  return mapper(value as T) as Responsive<U>;
}

export function mapResponsiveSizeToTypography(
  size: Responsive<TshirtSize> | undefined,
): Responsive<TypographySize> | undefined {
  return mapResponsiveValue(size, (entry) => sizeMap[entry]);
}

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
