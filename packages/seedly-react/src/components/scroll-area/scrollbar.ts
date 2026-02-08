import { ScrollArea } from '@base-ui/react/scroll-area';
import * as styles from '@kalink-ui/seedly/components/scroll-area';

import { withClassName } from '../shared/with-class-name';

export const Scrollbar: typeof ScrollArea.Scrollbar = withClassName(
  ScrollArea.Scrollbar,
  styles.scrollbar,
);
