import { Menu } from '@base-ui/react/menu';
import * as styles from '@kalink-ui/seedly/components/menu';

import { withClassName } from '../shared/with-class-name';

export const Item: typeof Menu.Item = withClassName(Menu.Item, styles.item);
