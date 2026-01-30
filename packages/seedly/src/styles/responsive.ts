import { styleVariants, type StyleRule } from '@vanilla-extract/css';
import { clsx } from 'clsx';

import { screen, type BreakpointKey } from './breakpoints';

export type BreakpointWithBase = 'xs' | BreakpointKey;

export type ResponsiveObject<T, B extends string> = Partial<
  Record<Exclude<B, 'xs'>, T>
> & { xs?: T };

export type ResponsiveArray<T> = (T | null | undefined)[];

export type Responsive<T, B extends string = BreakpointWithBase> =
  | T
  | ResponsiveObject<T, B>
  | ResponsiveArray<T>;

function entriesOf<K extends string | number, V>(
  record: Partial<Record<K, V>>,
): [K, V][] {
  return Object.entries(record) as [K, V][];
}

function recordFromEntries<K extends string | number, V>(
  entries: [K, V][],
): Record<K, V> {
  return Object.fromEntries(entries) as Record<K, V>;
}

function styleVariantsWithArrays<
  Variants extends Record<string | number, StyleRule | StyleRule[]>,
>(variants: Variants): { [K in keyof Variants]: string } {
  return styleVariants(variants as Record<string, StyleRule>) as {
    [K in keyof Variants]: string;
  };
}

export function resolveResponsive<T, B extends string = BreakpointWithBase>(
  value: Responsive<T, B> | undefined,
  order: readonly B[],
): Partial<Record<B, T>> {
  if (value == null) {
    return {};
  }

  if (Array.isArray(value)) {
    const out: Partial<Record<B, T>> = {};

    value.forEach((val, i) => {
      const breakpoint = order[i];

      if (val != null && breakpoint != null) {
        out[breakpoint] = val;
      }
    });

    return out;
  }

  if (typeof value === 'object') {
    return value as Partial<Record<B, T>>;
  }

  return { xs: value } as Partial<Record<B, T>>;
}

export function getResponsiveBase<T>(
  value: Responsive<T> | undefined,
  order: readonly BreakpointWithBase[] = defaultOrder,
): T | undefined {
  const map = resolveResponsive(value, order);

  return map.xs;
}

export interface CreateResponsiveVariantsArgs<
  VariantValues extends string | number,
  Bps extends string,
> {
  styles: Record<VariantValues, StyleRule | StyleRule[]>;
  media: Partial<Record<Exclude<Bps, 'xs'>, string>>;
}

export function createResponsiveVariants<
  const VariantValues extends string | number,
  const Bps extends string,
>(args: CreateResponsiveVariantsArgs<VariantValues, Bps>) {
  const { styles, media } = args;

  const at = recordFromEntries(
    entriesOf(media).map(([bp, query]) => {
      const styleMap = recordFromEntries(
        entriesOf<VariantValues, StyleRule | StyleRule[]>(styles).map(
          ([val, rule]) => [val, applyMedia(query, rule)],
        ),
      );

      return [bp, styleVariantsWithArrays(styleMap)];
    }),
  );

  return at;
}

function applyMedia(
  query: string,
  rule: StyleRule | StyleRule[],
): StyleRule | StyleRule[] {
  if (Array.isArray(rule)) {
    return rule.map((r) => ({ '@media': { [query]: r } }));
  }

  return { '@media': { [query]: rule } };
}

type MakeResponsive<V, B extends string> = {
  [K in keyof V]: V[K] extends string | number ? Responsive<V[K], B> : V[K];
};

export interface ResponsiveRecipeArgs<V, Bps extends string> {
  recipe: (props: V) => string;
  at: Partial<Record<keyof V, Partial<Record<Bps, Record<string, string>>>>>;
  order: readonly Bps[];
}

export function responsiveRecipe<
  V extends Record<string, unknown>,
  const Bps extends string,
>(args: ResponsiveRecipeArgs<V, Bps>) {
  const { recipe, at, order } = args;
  type ClassValue = Parameters<typeof clsx>[number];

  return (props: MakeResponsive<V, Bps>, ...classNames: ClassValue[]) => {
    const responsiveRest = props as MakeResponsive<V, Bps>;
    const keys = Object.keys(responsiveRest) as (keyof V)[];

    const baseProps: Partial<V> = {};

    for (const key of keys) {
      const value = responsiveRest[key];
      const map = resolveResponsive<unknown, Bps>(
        value as Responsive<unknown, Bps> | undefined,
        order,
      );

      const baseValue =
        (map as Partial<Record<BreakpointWithBase, unknown>>).xs ?? value;

      baseProps[key] = baseValue as V[typeof key];
    }

    const base = recipe(baseProps as V);
    const overrides: string[] = [];

    for (const key of keys) {
      const value = responsiveRest[key];
      const variantAt = at[key];
      const map = resolveResponsive<unknown, Bps>(
        value as Responsive<unknown, Bps> | undefined,
        order,
      );

      if (!variantAt) {
        continue;
      }

      for (const bp of order) {
        if (bp === 'xs') {
          continue;
        }

        const val = map[bp];

        if (val == null) {
          continue;
        }

        const cls = variantAt[bp]?.[String(val)];

        if (cls) {
          overrides.push(cls);
        }
      }
    }

    return clsx(base, ...overrides, ...classNames);
  };
}

// Default viewport media queries (can be replaced per-component if needed)
export const defaultMedia = {
  sm: screen.sm,
  md: screen.md,
  lg: screen.lg,
  xl: screen.xl,
  '2xl': screen['2xl'],
  '3xl': screen['3xl'],
} as const satisfies Partial<Record<BreakpointKey, string>>;

export const defaultOrder: readonly BreakpointWithBase[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
] as const;
