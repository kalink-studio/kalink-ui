import { Control } from './control';
import { Description } from './description';
import { Error } from './error';
import { Label } from './label';
import { Root } from './root';

export const Field = {
  Root,
  Label,
  Control,
  Error,
  Description,
} as const;
