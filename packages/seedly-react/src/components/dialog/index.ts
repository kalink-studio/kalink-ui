import { Backdrop } from './backdrop';
import { Close } from './close';
import { Description } from './description';
import { Popup } from './popup';
import { Portal } from './portal';
import { Root } from './root';
import { Title } from './title';
import { Trigger } from './trigger';

export const Dialog = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Popup,
  Title,
  Description,
  Close,
} as const;
