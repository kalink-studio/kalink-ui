import { ScrollArea } from '@base-ui/react/scroll-area';
import * as styles from '@kalink-ui/seedly/components/scroll-area';

import { withClassName } from '../shared/with-class-name';

export const Root: typeof ScrollArea.Root = withClassName(
  ScrollArea.Root,
  styles.scrollArea,
);
