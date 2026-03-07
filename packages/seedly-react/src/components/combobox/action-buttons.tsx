import { useRender } from '@base-ui/react/use-render';
import { actionButtons as actionButtonsClassName } from '@kalink-ui/seedly/components/combobox';

import { mergeClassName } from '../../utils/merge-class-name';

export type ActionButtonsProps = useRender.ComponentProps<'div'>;

export function ActionButtons({
  className,
  render,
  ...props
}: ActionButtonsProps) {
  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      className: mergeClassName(actionButtonsClassName, className),
    },
  });
}
