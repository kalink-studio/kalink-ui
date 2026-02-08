import { Close } from './close';
import { Content } from './content';
import { Description } from './description';
import { Portal } from './portal';
import { Provider } from './provider';
import { Root } from './root';
import { Title } from './title';
import { Viewport } from './viewport';

interface ToastPrimitives {
  Provider: typeof Provider;
  Portal: typeof Portal;
  Viewport: typeof Viewport;
  Root: typeof Root;
  Content: typeof Content;
  Title: typeof Title;
  Description: typeof Description;
  Close: typeof Close;
}

export const Toast: ToastPrimitives = {
  Provider,
  Portal,
  Viewport,
  Root,
  Content,
  Title,
  Description,
  Close,
};
