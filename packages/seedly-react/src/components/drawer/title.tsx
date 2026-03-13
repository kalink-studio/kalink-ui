import { Drawer, type DrawerTitleProps } from '@base-ui/react/drawer';
import { title as titleClassName } from '@kalink-ui/seedly/components/drawer';

import { mergeClassName } from '../../utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '../../utils/resolve-state-props';
import { Heading, type HeadingRootProps } from '../heading';

type TitleProps = Omit<DrawerTitleProps, 'className' | 'render'> &
  Pick<HeadingRootProps, 'align' | 'size' | 'variant'> & {
    className?: DrawerTitleProps['className'];
    render?: DrawerTitleProps['render'];
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
    <Drawer.Title
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
