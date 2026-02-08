import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import * as styles from '@kalink-ui/seedly/components/toggle';

import { withClassName } from '../shared/with-class-name';

export const Toggle: typeof BaseToggle = withClassName(
  BaseToggle,
  styles.button,
);
