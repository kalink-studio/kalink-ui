import { Empty } from './empty';
import { Input } from './input';
import { Item } from './item';
import { List } from './list';
import { Popup } from './popup';
import { Portal } from './portal';
import { Positioner } from './positioner';
import { Root } from './root';

export const Autocomplete = {
  Root,
  Input,
  Portal,
  Positioner,
  Popup,
  Empty,
  List,
  Item,
} as const;
