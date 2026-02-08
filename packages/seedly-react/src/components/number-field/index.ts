import { Decrement } from './decrement';
import { Group } from './group';
import { Increment } from './increment';
import { Input } from './input';
import { Root } from './root';
import { ScrubArea } from './scrub-area';
import { ScrubAreaCursor } from './scrub-area-cursor';

export const NumberField = {
  Root,
  ScrubArea,
  ScrubAreaCursor,
  Group,
  Decrement,
  Input,
  Increment,
} as const;
