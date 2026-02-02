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
    surface: sys.color.surface.base,
    toneNeutral: sys.color.tone.neutral,
    tonePrimary: sys.color.tone.primary,
    toneDestructive: sys.color.tone.destructive,
    toneSuccess: sys.color.tone.success,
  },
  color: {
    surface: sys.color.content.base,
    onNeutral: sys.color.tone.onNeutral,
    onPrimary: sys.color.tone.onPrimary,
    onDestructive: sys.color.tone.onDestructive,
    onSuccess: sys.color.tone.onSuccess,
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
