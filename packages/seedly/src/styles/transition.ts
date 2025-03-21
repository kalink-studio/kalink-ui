import { getProp } from '@kalink-ui/dibbly';

import { type Duration, type Easing, sys } from './system-contract.css';

export type CreateTransitionFn = (
  props: string | string[],
  options?: {
    duration?: Duration;
    easing?: Easing;
    delay?: string;
  },
) => string;

export const transition: CreateTransitionFn = (props = ['all'], options = {}) =>
  (Array.isArray(props) ? props : [props])
    .map(
      (animatedProp) =>
        `${animatedProp} ${
          options.duration
            ? getProp(sys.motion.duration, options.duration)
            : sys.motion.duration.medium[1]
        } ${options.easing ? getProp(sys.motion.easing, options.easing) : sys.motion.easing.standard} ${
          options.delay || '0ms'
        }`,
    )
    .join(',');
