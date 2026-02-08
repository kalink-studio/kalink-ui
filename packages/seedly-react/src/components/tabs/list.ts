import { Tabs } from '@base-ui/react/tabs';
import * as styles from '@kalink-ui/seedly/components/tabs';

import { withClassName } from '../shared/with-class-name';

export const List: typeof Tabs.List = withClassName(Tabs.List, styles.list);
