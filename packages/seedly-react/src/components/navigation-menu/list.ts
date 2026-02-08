import { NavigationMenu } from '@base-ui/react/navigation-menu';
import * as styles from '@kalink-ui/seedly/components/navigation-menu';

import { withClassName } from '../shared/with-class-name';

export const List: typeof NavigationMenu.List = withClassName(
  NavigationMenu.List,
  styles.list,
);
