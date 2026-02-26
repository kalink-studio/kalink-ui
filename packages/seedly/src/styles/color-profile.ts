import {
  resolveActionColorProfileValues,
  type ActionColorArgs,
  type ActionColorValues,
  type ActionColorVariant,
} from './color-profile.action';
import {
  resolveStaticColorProfileValues,
  type StaticColorArgs,
  type StaticColorValues,
} from './color-profile.static';

export type ColorProfile = 'action' | 'static';
export type ColorVariant = ActionColorVariant;
export type ProfileColorValues = ActionColorValues;

export type { ActionColorArgs, ColorTone } from './color-profile.action';
export type {
  ContainerLevel,
  StaticColorArgs,
  StaticContainerColorArgs,
  StaticColorKey,
  StaticColorSource,
  StaticSurfaceColorArgs,
  StaticToneColorArgs,
  StaticColorValues,
  StaticColorVariant,
  SurfaceLevel,
} from './color-profile.static';

type ColorProfileArgs = ActionColorArgs | StaticColorArgs;

export function resolveColorProfileValues(
  args: ActionColorArgs,
): ProfileColorValues;

export function resolveColorProfileValues(
  args: StaticColorArgs,
): StaticColorValues;

export function resolveColorProfileValues(
  args: ColorProfileArgs,
): ProfileColorValues | StaticColorValues {
  if (args.profile === 'action') {
    return resolveActionColorProfileValues(args);
  }

  return resolveStaticColorProfileValues(args);
}
