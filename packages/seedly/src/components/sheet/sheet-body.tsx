import { ElementType } from 'react';

import { Box, BoxProps } from '../box';
import { ScrollArea } from '../scroll-area';

export type SheetBodyProps<TUse extends ElementType> = BoxProps<TUse>;

export function SheetBody<TUse extends ElementType>(
  props: SheetBodyProps<TUse>,
) {
  return (
    <ScrollArea>
      <Box {...props} />
    </ScrollArea>
  );
}
