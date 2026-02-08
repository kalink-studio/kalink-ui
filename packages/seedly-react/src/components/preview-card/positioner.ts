import { PreviewCard } from '@base-ui/react/preview-card';
import * as styles from '@kalink-ui/seedly/components/preview-card';

import { withClassName } from '../shared/with-class-name';

export const Positioner: typeof PreviewCard.Positioner = withClassName(
  PreviewCard.Positioner,
  styles.positioner,
);
