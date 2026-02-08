import { Arrow } from './arrow';
import { Content } from './content';
import { Icon } from './icon';
import { Item } from './item';
import { Link } from './link';
import { List } from './list';
import { Popup } from './popup';
import { Portal } from './portal';
import { Positioner } from './positioner';
import { Root } from './root';
import { Trigger } from './trigger';
import { Viewport } from './viewport';

export const NavigationMenu = {
  Root,
  List,
  Item,
  Trigger,
  Icon,
  Content,
  Portal,
  Positioner,
  Popup,
  Arrow,
  Viewport,
  Link,
} as const;
