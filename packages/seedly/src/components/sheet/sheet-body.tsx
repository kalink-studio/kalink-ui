import { ElementType } from 'react';

import { Box, BoxLayoutProps } from '../box';
import { ScrollArea } from '../scroll-area';

export type SheetBodyProps<TUse extends ElementType> = BoxLayoutProps<TUse>;

export function SheetBody<TUse extends ElementType>(
  props: SheetBodyProps<TUse>,
) {
  return (
    <ScrollArea>
      <Box {...props} />
    </ScrollArea>
  );
}
