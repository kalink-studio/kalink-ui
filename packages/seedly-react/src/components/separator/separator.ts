import { Separator as BaseSeparator } from '@base-ui/react/separator';
import * as styles from '@kalink-ui/seedly/components/separator';

import { withClassName } from '../shared/with-class-name';

export const Separator: typeof BaseSeparator = withClassName(
  BaseSeparator,
  styles.separator,
);
