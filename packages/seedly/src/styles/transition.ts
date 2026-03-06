import {
  type Duration,
  type DurationValue,
  type Easing,
  type EasingValue,
  sys,
} from './system-contract.css';

type TransitionDuration = Duration | DurationValue;
type TransitionEasing = Easing | EasingValue;

export interface CreateTransitionOptions {
  duration?: TransitionDuration;
  easing?: TransitionEasing;
  delay?: string;
}

export type CreateTransitionFn = (
  props: string | string[],
  options?: CreateTransitionOptions,
) => string;

function getFromPath(source: unknown, path: string): string {
  const segments = path.split('.');
  let current = source;

  for (const segment of segments) {
    if (current == null || typeof current !== 'object') {
      return '';
    }

    current = (current as Record<string, unknown>)[segment];
  }

  return typeof current === 'string' ? current : '';
}

export const transition: CreateTransitionFn = (
  props = ['all'],
  options = {},
) => {
  const animatedProps = Array.isArray(props) ? props : [props];

  return animatedProps
    .map((animatedProp) => {
      const duration = options.duration
        ? getFromPath(sys.motion.duration, options.duration) || options.duration
        : sys.motion.duration.medium[1];

      const easing = options.easing
        ? getFromPath(sys.motion.easing, options.easing) || options.easing
        : sys.motion.easing.standard;

      const delay = options.delay || '0ms';

      return `${animatedProp} ${duration} ${easing} ${delay}`;
    })
    .join(',');
};
