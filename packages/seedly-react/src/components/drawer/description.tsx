import { Drawer, type DrawerDescriptionProps } from '@base-ui/react/drawer';
import { description as descriptionClassName } from '@kalink-ui/seedly/components/drawer';

import { mergeClassName } from '../../utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '../../utils/resolve-state-props';
import { Text, type TextProps } from '../text';

type DescriptionProps = Omit<DrawerDescriptionProps, 'className' | 'render'> &
  Pick<
    TextProps,
    'align' | 'lineClamp' | 'size' | 'truncate' | 'variant' | 'wrap'
  > & {
    className?: DrawerDescriptionProps['className'];
    render?: DrawerDescriptionProps['render'];
  };

export function Description({
  className,
  render,
  align,
  lineClamp,
  truncate,
  wrap,
  variant = 'body',
  size = 'medium',
  ...props
}: DescriptionProps) {
  return (
    <Drawer.Description
      {...props}
      render={(descriptionProps, state) => (
        <Text
          {...descriptionProps}
          align={align}
          lineClamp={lineClamp}
          truncate={truncate}
          wrap={wrap}
          variant={variant}
          size={size}
          className={mergeClassName(
            descriptionClassName,
            resolveStateClassName(className, state),
          )}
          render={resolveStateRender(render, state) ?? <p />}
        />
      )}
    />
  );
}
