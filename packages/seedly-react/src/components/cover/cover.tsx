import { useRender } from '@base-ui/react/use-render';
import {
  coverResponsive,
  coverVars,
  type CoverVariants,
} from '@kalink-ui/seedly/components/cover';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import { mergeClassName } from '../../utils/merge-class-name';

export type CoverProps = useRender.ComponentProps<'div'> &
  Omit<CoverVariants, 'spacing'> & {
    minSize?: string;
    spacing?: NonNullable<CoverVariants['spacing']>;
  };

export function Cover({
  spacing,
  minSize,
  className,
  render,
  ...props
}: CoverProps) {
  const style =
    minSize == null
      ? props.style
      : {
          ...props.style,
          ...assignInlineVars({
            [coverVars.layout.rootMinBlockSize]: minSize,
          }),
        };

  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      style,
      className: mergeClassName(coverResponsive({ spacing }), className),
    },
  });
}
