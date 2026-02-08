import { ScrollArea } from '@base-ui/react/scroll-area';
import * as styles from '@kalink-ui/seedly/components/scroll-area';

import { withClassName } from '../shared/with-class-name';

export const Thumb: typeof ScrollArea.Thumb = withClassName(
  ScrollArea.Thumb,
  styles.thumb,
);
