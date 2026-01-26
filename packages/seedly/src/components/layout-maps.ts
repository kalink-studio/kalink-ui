import { assignVars, type StyleRule } from '@vanilla-extract/css';

import { mapContractVars, sys } from '../styles';
import { components } from '../styles/layers.css';

interface GapVars {
  gap: string;
}

export const createSpacingVarStyles = (
  vars: GapVars,
  property?: 'gap' | 'columnGap' | 'rowGap',
) =>
  mapContractVars(sys.spacing, (key) => ({
    '@layer': {
      [components]: {
        ...(property ? { [property]: vars.gap } : {}),
        vars: assignVars(
          vars as never,
          {
            gap: sys.spacing[key],
          } as never,
        ),
      },
    },
  }));

const createLayeredStyleMap = <T extends string>(
  property: string,
  values: Record<T, string>,
) =>
  Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      {
        '@layer': {
          [components]: {
            [property]: value,
          },
        },
      },
    ]),
  ) as Record<T, StyleRule>;

const flexAlignItemsValues = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
} as const;

const flexAlignItemsBaselineValues = {
  ...flexAlignItemsValues,
  baseline: 'baseline',
} as const;

const flexJustifyContentValues = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  spaceBetween: 'space-between',
  spaceAround: 'space-around',
  spaceEvenly: 'space-evenly',
} as const;

const gridAxisValues = {
  start: 'start',
  end: 'end',
  center: 'center',
  stretch: 'stretch',
} as const;

const gridContentValues = {
  start: 'start',
  end: 'end',
  center: 'center',
  spaceBetween: 'space-between',
  spaceAround: 'space-around',
  spaceEvenly: 'space-evenly',
} as const;

const gridContentStretchValues = {
  ...gridContentValues,
  stretch: 'stretch',
} as const;

export const flexAlignItemsStyles = createLayeredStyleMap(
  'alignItems',
  flexAlignItemsValues,
);

export const flexAlignItemsWithBaselineStyles = createLayeredStyleMap(
  'alignItems',
  flexAlignItemsBaselineValues,
);

export const flexJustifyContentStyles = createLayeredStyleMap(
  'justifyContent',
  flexJustifyContentValues,
);

export const gridAlignItemsStyles = createLayeredStyleMap(
  'alignItems',
  gridAxisValues,
);

export const gridJustifyItemsStyles = createLayeredStyleMap(
  'justifyItems',
  gridAxisValues,
);

export const gridJustifyContentStyles = createLayeredStyleMap(
  'justifyContent',
  gridContentValues,
);

export const gridAlignContentStyles = createLayeredStyleMap(
  'alignContent',
  gridContentStretchValues,
);
