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
    base: sys.tone.neutral,
    onBase: sys.tone.onNeutral,
  },
  primary: {
    base: sys.tone.primary,
    onBase: sys.tone.onPrimary,
  },
  destructive: {
    base: sys.tone.destructive,
    onBase: sys.tone.onDestructive,
  },
  success: {
    base: sys.tone.success,
    onBase: sys.tone.onSuccess,
  },
};

type ToneVarContract = Parameters<typeof assignVars>[0];

/**
 * assignVars requires the contract and tokens to be the same inferred shape;
 * we centralize the escape-hatch cast here so callers don't repeat it.
 */
const assignTone = (toneVars: ToneVarContract, tokens: ToneTokens) =>
  assignVars(toneVars as never, tokens as never);

export const createToneAssignments = (toneVars: ToneVarContract) =>
  ({
    neutral: assignTone(toneVars, toneTokens.neutral),
    primary: assignTone(toneVars, toneTokens.primary),
    destructive: assignTone(toneVars, toneTokens.destructive),
    success: assignTone(toneVars, toneTokens.success),
  }) as const;

export const createToneStyles = (
  toneVars: ToneVarContract,
  getVars?: (tokens: ToneTokens, tone: ToneKey) => Record<string, string>,
) => {
  const toneAssignments = createToneAssignments(toneVars);
  const styles = {} as Record<ToneKey, StyleRule>;

  (Object.keys(toneAssignments) as ToneKey[]).forEach((tone) => {
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
  });

  return styles;
};
