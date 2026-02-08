import { Arrow } from './arrow';
import { Description } from './description';
import { Popup } from './popup';
import { Portal } from './portal';
import { Positioner } from './positioner';
import { Root } from './root';
import { Title } from './title';
import { Trigger } from './trigger';

export const Popover = {
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Arrow,
  Title,
  Description,
} as const;
