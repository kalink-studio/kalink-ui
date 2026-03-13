import { useRender } from '@base-ui/react/use-render';
import {
  labelRecipe,
  type LabelVariants,
} from '@kalink-ui/seedly/components/label';

import { mergeClassName } from '../../utils/merge-class-name';

export type LabelProps = useRender.ComponentProps<'label'> & LabelVariants;

export function Label({ variant, className, render, ...props }: LabelProps) {
  return useRender({
    render,
    defaultTagName: 'label',
    props: {
      ...props,
      className: mergeClassName(labelRecipe({ variant }), className),
    },
  });
}
