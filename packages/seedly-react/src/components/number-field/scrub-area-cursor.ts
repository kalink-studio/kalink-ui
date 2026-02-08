import { NumberField } from '@base-ui/react/number-field';
import * as styles from '@kalink-ui/seedly/components/number-field';

import { withClassName } from '../shared/with-class-name';

export const ScrubAreaCursor: typeof NumberField.ScrubAreaCursor =
  withClassName(NumberField.ScrubAreaCursor, styles.scrubAreaCursor);
