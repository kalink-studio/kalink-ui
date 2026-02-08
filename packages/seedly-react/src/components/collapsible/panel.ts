import { Collapsible } from '@base-ui/react/collapsible';
import * as styles from '@kalink-ui/seedly/components/collapsible';

import { withClassName } from '../shared/with-class-name';

export const Panel: typeof Collapsible.Panel = withClassName(
  Collapsible.Panel,
  styles.panel,
);
