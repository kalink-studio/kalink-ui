import { Collapsible } from '@base-ui/react/collapsible';
import * as styles from '@kalink-ui/seedly/components/collapsible';

import { withClassName } from '../shared/with-class-name';

export const Root: typeof Collapsible.Root = withClassName(
  Collapsible.Root,
  styles.collapsible,
);
