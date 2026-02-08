import { Avatar } from '@base-ui/react/avatar';
import * as styles from '@kalink-ui/seedly/components/avatar';

import { withClassName } from '../shared/with-class-name';

export const Image: typeof Avatar.Image = withClassName(
  Avatar.Image,
  styles.image,
);
