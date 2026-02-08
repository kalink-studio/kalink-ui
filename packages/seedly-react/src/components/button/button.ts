import { Button as BaseButton } from '@base-ui/react/button';
import * as styles from '@kalink-ui/seedly/components/button';

import { withClassName } from '../shared/with-class-name';

export const Button: typeof BaseButton = withClassName(
  BaseButton,
  styles.button,
);
