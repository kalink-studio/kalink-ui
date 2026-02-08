import { PreviewCard } from '@base-ui/react/preview-card';
import * as styles from '@kalink-ui/seedly/components/preview-card';

import { withClassName } from '../shared/with-class-name';

export const Popup: typeof PreviewCard.Popup = withClassName(
  PreviewCard.Popup,
  styles.popup,
);
