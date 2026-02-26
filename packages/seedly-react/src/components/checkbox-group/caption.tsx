import { useRender } from '@base-ui/react/use-render';
import { caption as captionClassName } from '@kalink-ui/seedly/components/checkbox-group';
import { labelRecipe } from '@kalink-ui/seedly/components/label';

import { mergeClassName } from '@/utils/merge-class-name';

export type CaptionProps = useRender.ComponentProps<'div'>;

export function Caption({ className, render, ...props }: CaptionProps) {
  const baseClassName = `${labelRecipe({ variant: 'caption' })} ${captionClassName}`;

  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      className: mergeClassName(baseClassName, className),
    },
  });
}
