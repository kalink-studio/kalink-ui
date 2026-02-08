import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import * as styles from '@kalink-ui/seedly/components/toggle-group';

import { withClassName } from '../shared/with-class-name';

export const ToggleGroup: typeof BaseToggleGroup = withClassName(
  BaseToggleGroup,
  styles.panel,
);
