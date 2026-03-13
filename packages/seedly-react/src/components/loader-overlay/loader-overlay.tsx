import { useRender } from '@base-ui/react/use-render';
import {
  loaderOverlayRecipe,
  type LoaderOverlayVariants,
} from '@kalink-ui/seedly/components/loader-overlay';
import { type Spacing } from '@kalink-ui/seedly/styles';

import { mergeClassName } from '../../utils/merge-class-name';
import { Center } from '../center';
import { MoonLoader } from '../loader';
import { Stack } from '../stack';
import { Text } from '../text';

interface LoaderOverlayContentProps {
  text?: string;
  tone?: LoaderOverlayVariants['tone'];
  spacing: Spacing;
}

function LoaderOverlayContent({
  text,
  tone,
  spacing,
}: LoaderOverlayContentProps) {
  return (
    <Center andText intrinsic>
      <Stack align="center" spacing={spacing}>
        <MoonLoader active forceMount tone={tone} />
        {text ? <Text>{text}</Text> : null}
      </Stack>
    </Center>
  );
}

export type LoaderOverlayProps = Omit<
  useRender.ComponentProps<'div'>,
  'children'
> &
  LoaderOverlayVariants & {
    text?: string;
    spacing?: Spacing;
  };

export function LoaderOverlay({
  className,
  text,
  position,
  tone,
  spacing = 2,
  render,
  ...props
}: LoaderOverlayProps) {
  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      className: mergeClassName(
        loaderOverlayRecipe({ position, tone }),
        className,
      ),
      children: (
        <LoaderOverlayContent text={text} tone={tone} spacing={spacing} />
      ),
    },
  });
}
