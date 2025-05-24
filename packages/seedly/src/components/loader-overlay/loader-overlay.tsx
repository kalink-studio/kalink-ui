import { clsx } from 'clsx';

import { Center } from '../center';
import { MoonLoader } from '../loader';
import { Stack } from '../stack';
import { Text } from '../text';

import { loaderOverlay, LoaderOverlayVariants } from './loader-overlay.css';

interface LoaderOverlayProps extends LoaderOverlayVariants {
  text?: string;
  className?: string;
}

export function LoaderOverlay({
  className,
  text,
  position,
}: LoaderOverlayProps) {
  return (
    <div className={clsx(loaderOverlay({ position }), className)}>
      <Stack use={Center}>
        <MoonLoader active forceMount />
        {text && <Text>{text}</Text>}
      </Stack>
    </div>
  );
}
