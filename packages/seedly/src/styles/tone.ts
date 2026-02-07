import { assignVars, type StyleRule } from '@vanilla-extract/css';

import { components } from './layers.css';
import { sys } from './system-contract.css';

export type ToneKey = 'neutral' | 'primary' | 'destructive' | 'success';

export interface ToneTokens {
  base: string;
  onBase: string;
}

export const toneTokens: Record<ToneKey, ToneTokens> = {
  neutral: {
    base: sys.color.tone.neutral,
    onBase: sys.color.tone.onNeutral,
  },
  primary: {
    base: sys.color.tone.primary,
    onBase: sys.color.tone.onPrimary,
  },
  destructive: {
    base: sys.color.tone.destructive,
    onBase: sys.color.tone.onDestructive,
  },
  success: {
    base: sys.color.tone.success,
    onBase: sys.color.tone.onSuccess,
  },
};

type ToneVarContract = Parameters<typeof assignVars>[0];

const assignTone = (toneVars: ToneVarContract, tokens: ToneTokens) => {
  return assignVars(toneVars as never, tokens as never);
};

export const createToneAssignments = (toneVars: ToneVarContract) => {
  return {
    neutral: assignTone(toneVars, toneTokens.neutral),
    primary: assignTone(toneVars, toneTokens.primary),
    destructive: assignTone(toneVars, toneTokens.destructive),
    success: assignTone(toneVars, toneTokens.success),
  } as const;
};

export const createToneStyles = (
  toneVars: ToneVarContract,
  getVars?: (tokens: ToneTokens, tone: ToneKey) => Record<string, string>,
) => {
  const toneAssignments = createToneAssignments(toneVars);
  const styles = {} as Record<ToneKey, StyleRule>;

  for (const tone of Object.keys(toneAssignments) as ToneKey[]) {
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
