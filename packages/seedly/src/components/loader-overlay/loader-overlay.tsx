import { clsx } from 'clsx';

import { Box } from '../box';
import { Center } from '../center';
import { MoonLoader } from '../loader';
import { Stack, StackProps } from '../stack';
import { Text } from '../text';

import { loaderOverlay, LoaderOverlayVariants } from './loader-overlay.css';

interface LoaderOverlayProps extends LoaderOverlayVariants {
  text?: string;
  className?: string;
  spacing?: StackProps<'div'>['spacing'];
}

export function LoaderOverlay({
  className,
  text,
  position,
  spacing = 2,
}: LoaderOverlayProps) {
  return (
    <Box
      spacing={spacing}
      className={clsx(loaderOverlay({ position }), className)}
    >
      <Stack use={Center} align="center" spacing={spacing} intrinsic andText>
        <MoonLoader active forceMount />
        {text && <Text>{text}</Text>}
      </Stack>
    </Box>
  );
}
