import { Popover, type PopoverTitleProps } from '@base-ui/react/popover';
import { title as titleClassName } from '@kalink-ui/seedly/components/popover';

import { Heading, type HeadingRootProps } from '../heading';
import { mergeClassName } from '@/utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '@/utils/resolve-state-props';

type TitleProps = Omit<PopoverTitleProps, 'className' | 'render'> &
  Pick<HeadingRootProps, 'align' | 'size' | 'variant'> & {
    className?: PopoverTitleProps['className'];
    render?: PopoverTitleProps['render'];
  };

export function Title({
  className,
  render,
  align,
  variant = 'title',
  size = 'medium',
  ...props
}: TitleProps) {
  return (
    <Popover.Title
      {...props}
      render={(titleProps, state) => {
        const { children, ...headingProps } = titleProps;

        return (
          <Heading.Root
            {...headingProps}
            align={align}
            variant={variant}
            size={size}
            className={mergeClassName(
              titleClassName,
              resolveStateClassName(className, state),
            )}
            render={resolveStateRender(render, state) ?? <h2 />}
          >
            {children}
          </Heading.Root>
        );
      }}
    />
  );
}
