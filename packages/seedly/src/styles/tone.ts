import { assignVars, type StyleRule } from '@vanilla-extract/css';

import { components } from './layers.css';
import { sys, type Tone } from './system-contract.css';

export interface ToneTokens {
  base: string;
  onBase: string;
  container: string;
  onContainer: string;
}

export const toneTokens: Record<Tone, ToneTokens> = {
  neutral: {
    base: sys.color.tone.neutral,
    onBase: sys.color.tone.onNeutral,
    container: sys.color.tone.neutralContainer,
    onContainer: sys.color.tone.onNeutralContainer,
  },
  primary: {
    base: sys.color.tone.primary,
    onBase: sys.color.tone.onPrimary,
    container: sys.color.tone.primaryContainer,
    onContainer: sys.color.tone.onPrimaryContainer,
  },
  secondary: {
    base: sys.color.tone.secondary,
    onBase: sys.color.tone.onSecondary,
    container: sys.color.tone.secondaryContainer,
    onContainer: sys.color.tone.onSecondaryContainer,
  },
  tertiary: {
    base: sys.color.tone.tertiary,
    onBase: sys.color.tone.onTertiary,
    container: sys.color.tone.tertiaryContainer,
    onContainer: sys.color.tone.onTertiaryContainer,
  },
  error: {
    base: sys.color.tone.error,
    onBase: sys.color.tone.onError,
    container: sys.color.tone.errorContainer,
    onContainer: sys.color.tone.onErrorContainer,
  },
};

type ToneVarContract = Parameters<typeof assignVars>[0];

const assignTone = (toneVars: ToneVarContract, tokens: ToneTokens) => {
  return assignVars(
    toneVars as never,
    {
      base: tokens.base,
      onBase: tokens.onBase,
    } as never,
  );
};

export const createToneAssignments = (toneVars: ToneVarContract) => {
  return {
    neutral: assignTone(toneVars, toneTokens.neutral),
    primary: assignTone(toneVars, toneTokens.primary),
    secondary: assignTone(toneVars, toneTokens.secondary),
    tertiary: assignTone(toneVars, toneTokens.tertiary),
    error: assignTone(toneVars, toneTokens.error),
  } as const;
};

export const createToneStyles = (
  toneVars: ToneVarContract,
  getVars?: (tokens: ToneTokens, tone: Tone) => Record<string, string>,
) => {
  const toneAssignments = createToneAssignments(toneVars);
  const styles = {} as Record<Tone, StyleRule>;

  for (const tone of Object.keys(toneAssignments) as Tone[]) {
    styles[tone] = {
      '@layer': {
        [components]: {
          vars: {
            ...toneAssignments[tone],
            ...(getVars ? getVars(toneTokens[tone], tone) : {}),
          },
        },
      },
    };
  }

  return styles;
};
