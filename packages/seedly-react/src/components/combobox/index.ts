import { Clear } from './clear';
import { Empty } from './empty';
import { Input } from './input';
import { Item } from './item';
import { ItemIndicator } from './item-indicator';
import { List } from './list';
import { Popup } from './popup';
import { Portal } from './portal';
import { Positioner } from './positioner';
import { Root } from './root';
import { Trigger } from './trigger';

export const Combobox = {
  Root,
  Input,
  Clear,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Empty,
  List,
  Item,
  ItemIndicator,
} as const;
