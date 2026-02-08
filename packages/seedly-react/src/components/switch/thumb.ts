import { Switch } from '@base-ui/react/switch';
import * as styles from '@kalink-ui/seedly/components/switch';

import { withClassName } from '../shared/with-class-name';

export const Thumb: typeof Switch.Thumb = withClassName(
  Switch.Thumb,
  styles.thumb,
);
