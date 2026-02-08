import { Icon } from './icon';
import { Item } from './item';
import { ItemIndicator } from './item-indicator';
import { ItemText } from './item-text';
import { List } from './list';
import { Popup } from './popup';
import { Portal } from './portal';
import { Positioner } from './positioner';
import { Root } from './root';
import { ScrollDownArrow } from './scroll-down-arrow';
import { ScrollUpArrow } from './scroll-up-arrow';
import { Trigger } from './trigger';
import { Value } from './value';

export const Select = {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Positioner,
  Popup,
  ScrollUpArrow,
  List,
  Item,
  ItemIndicator,
  ItemText,
  ScrollDownArrow,
} as const;
