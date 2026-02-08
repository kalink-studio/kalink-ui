import { Collapsible } from '@base-ui/react/collapsible';
import * as styles from '@kalink-ui/seedly/components/collapsible';

import { withClassName } from '../shared/with-class-name';

export const Trigger: typeof Collapsible.Trigger = withClassName(
  Collapsible.Trigger,
  styles.trigger,
);
