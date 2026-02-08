import { Arrow } from './arrow';
import { Popup } from './popup';
import { Portal } from './portal';
import { Positioner } from './positioner';
import { Provider } from './provider';
import { Root } from './root';
import { Trigger } from './trigger';

export const Tooltip = {
  Provider,
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Arrow,
} as const;
