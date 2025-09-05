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
      const breakpoint = order[i] as B | undefined;

      if (val != null && breakpoint) {
        out[breakpoint] = val as T;
      }
    });

    return out;
  }

  if (typeof value === 'object') {
    return value as Partial<Record<B, T>>;
  }

  return { xs: value as T } as Partial<Record<B, T>>;
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

  const at = Object.fromEntries(
    Object.entries(media).map(([bp, query]) => {
      const styleEntries = Object.entries(styles) as [
        VariantValues,
        StyleRule | StyleRule[],
      ][];

      const styleMap = Object.fromEntries(
        styleEntries.map(([val, rule]) => [
          val,
          applyMedia(query as string, rule),
        ]),
      ) as Record<VariantValues, StyleRule | StyleRule[]>;

      return [bp, styleVariants(styleMap)];
    }),
  ) as Record<Exclude<Bps, 'xs'>, Record<VariantValues, string>>;

  return at;
}

function applyMedia(
  query: string,
  rule: StyleRule | StyleRule[],
): StyleRule | StyleRule[] {
  if (Array.isArray(rule)) {
    return rule.map((r) => ({ '@media': { [query]: r } })) as StyleRule[];
  }

  return { '@media': { [query]: rule } } as StyleRule;
}

type MakeResponsive<V, B extends string> = {
  [K in keyof V]: V[K] extends string | number ? Responsive<V[K], B> : V[K];
};

export interface ResponsiveRecipeArgs<V, Bps extends string> {
  recipe: (props: V) => string;
  at: Partial<
    Record<keyof V, Record<Exclude<Bps, 'xs'>, Record<string, string>>>
  >;
  order: readonly Bps[];
}

export function responsiveRecipe<
  V extends Record<string, unknown>,
  const Bps extends string,
>(args: ResponsiveRecipeArgs<V, Bps>) {
  const { recipe, at, order } = args;

  return (props: MakeResponsive<V, Bps> & { className?: string }) => {
    const { className, ...rest } = props as Record<string, unknown> & {
      className?: string;
    };

    const baseProps: Partial<V> = {};

    for (const key in rest) {
      const value = (rest as Record<string, unknown>)[key];
      const map = resolveResponsive(value, order);

      (baseProps as Record<string, unknown>)[key] =
        (map as Record<string, unknown>)['xs'] ?? value;
    }

    const base = recipe(baseProps as V);
    const overrides: string[] = [];

    for (const key in rest) {
      const value = (rest as Record<string, unknown>)[key];
      const map = resolveResponsive(value, order);
      const variantAt = (at as Record<string, unknown>)[key] as
        | Record<string, Record<string, string>>
        | undefined;

      if (!variantAt) {
        continue;
      }

      for (const bp of order) {
        if (bp === 'xs') {
          continue;
        }

        const val = (map as Partial<Record<Bps, unknown>>)[bp];

        if (val == null) {
          continue;
        }

        const cls = variantAt[bp as string]?.[String(val)];

        if (cls) {
          overrides.push(cls);
        }
      }
    }

    return clsx(base, ...overrides, className);
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
