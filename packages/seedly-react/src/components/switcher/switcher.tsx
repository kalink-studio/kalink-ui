import { useRender } from '@base-ui/react/use-render';
import {
  switcherResponsive,
  switcherVars,
  type SwitcherVariants,
} from '@kalink-ui/seedly/components/switcher';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import { mergeClassName } from '../../utils/merge-class-name';

import type { Responsive } from '@kalink-ui/seedly/styles';

export type SwitcherProps = useRender.ComponentProps<'div'> &
  Omit<SwitcherVariants, 'spacing' | 'limit'> & {
    threshold?: string;
    spacing?: NonNullable<SwitcherVariants['spacing']>;
    limit?: Responsive<NonNullable<SwitcherVariants['limit']>>;
  };

export function Switcher({
  spacing,
  threshold,
  limit,
  className,
  render,
  ...props
}: SwitcherProps) {
  const style =
    threshold == null
      ? props.style
      : {
          ...props.style,
          ...assignInlineVars({
            [switcherVars.layout.rootThreshold]: threshold,
          }),
        };

  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      style,
      className: mergeClassName(
        switcherResponsive({ spacing, limit }),
        className,
      ),
    },
  });
}
