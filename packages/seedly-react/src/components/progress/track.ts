import { Progress } from '@base-ui/react/progress';
import * as styles from '@kalink-ui/seedly/components/progress';

import { withClassName } from '../shared/with-class-name';

export const Track: typeof Progress.Track = withClassName(
  Progress.Track,
  styles.track,
);
