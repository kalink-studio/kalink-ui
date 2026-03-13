import { Dialog, type DialogTitleProps } from '@base-ui/react/dialog';
import { title as titleClassName } from '@kalink-ui/seedly/components/dialog';

import { mergeClassName } from '../../utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '../../utils/resolve-state-props';
import { Heading, type HeadingRootProps } from '../heading';

type TitleProps = Omit<DialogTitleProps, 'className' | 'render'> &
  Pick<HeadingRootProps, 'align' | 'size' | 'variant'> & {
    className?: DialogTitleProps['className'];
    render?: DialogTitleProps['render'];
  };

export function Title({
  className,
  render,
  align,
  variant = 'title',
  size = 'large',
  ...props
}: TitleProps) {
  return (
    <Dialog.Title
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
