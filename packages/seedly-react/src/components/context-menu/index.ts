import { Item } from './item';
import { Popup } from './popup';
import { Portal } from './portal';
import { Positioner } from './positioner';
import { Root } from './root';
import { Separator } from './separator';
import { Trigger } from './trigger';

export const ContextMenu = {
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Item,
  Separator,
} as const;
