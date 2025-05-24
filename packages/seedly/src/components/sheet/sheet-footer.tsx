import { ElementType } from 'react';

import { Box, BoxProps } from '../box';

export function SheetFooter<TUse extends ElementType>(props: BoxProps<TUse>) {
  return (
    <Box
      display="flex"
      flexDirection={{ sm: 'column-reverse', md: 'row' }}
      justifyContent={{ sm: 'flex-start', md: 'flex-end' }}
      gap="sm"
      {...props}
    />
  );
}
