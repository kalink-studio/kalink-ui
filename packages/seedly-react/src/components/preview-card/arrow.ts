import { PreviewCard } from '@base-ui/react/preview-card';
import * as styles from '@kalink-ui/seedly/components/preview-card';

import { withClassName } from '../shared/with-class-name';

export const Arrow: typeof PreviewCard.Arrow = withClassName(
  PreviewCard.Arrow,
  styles.arrow,
);
