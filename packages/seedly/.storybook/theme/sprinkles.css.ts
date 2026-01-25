import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { sys } from '../../src/styles/system-contract.css';

const space = {
  none: sys.spacing[0],
  small: sys.spacing[2],
  medium: sys.spacing[4],
  large: sys.spacing[6],
};

export const sprinklesProps = {
  padding: space,
  backgroundColor: {
    surface: sys.surface.background,
    toneNeutral: sys.tone.neutral,
    tonePrimary: sys.tone.primary,
    toneDestructive: sys.tone.destructive,
    toneSuccess: sys.tone.success,
  },
  color: {
    surface: sys.surface.foreground,
    onNeutral: sys.tone.onNeutral,
    onPrimary: sys.tone.onPrimary,
    onDestructive: sys.tone.onDestructive,
    onSuccess: sys.tone.onSuccess,
  },
  textAlign: {
    center: 'center',
    start: 'start',
    end: 'end',
  },
} as const;

export const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' },
  },
  defaultCondition: 'mobile',
  properties: sprinklesProps,
});

export const sprinkles = createSprinkles(responsiveProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];

export type SprinklesFnBase = ReturnType<typeof createSprinkles>;
