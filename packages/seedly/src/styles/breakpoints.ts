export const breakpoints = {
  sm: 568,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1600,
  '3xl': 1920,
} as const;

export type BreakpointKey = keyof typeof breakpoints;

export const screen = {
  maxXs: `(max-width: ${breakpoints.sm - 1}px)`,
  sm: `(min-width: ${breakpoints.sm}px)`,
  maxSm: `(max-width: ${breakpoints.md - 1}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  maxMd: `(max-width: ${breakpoints.lg - 1}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  maxLg: `(max-width: ${breakpoints.xl - 1}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  maxXl: `(max-width: ${breakpoints['2xl'] - 1}px)`,
  '2xl': `(min-width: ${breakpoints['2xl']}px)`,
  max2xl: `(max-width: ${breakpoints['3xl'] - 1}px)`,
  '3xl': `(min-width: ${breakpoints['3xl']}px)`,
} as const;
