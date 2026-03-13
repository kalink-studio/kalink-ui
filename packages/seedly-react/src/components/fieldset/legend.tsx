import { Fieldset, type FieldsetLegendProps } from '@base-ui/react/fieldset';
import { legend as legendClassName } from '@kalink-ui/seedly/components/fieldset';

import { mergeClassName } from '../../utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '../../utils/resolve-state-props';
import { Heading, type HeadingRootProps } from '../heading';

type LegendProps = Omit<FieldsetLegendProps, 'className' | 'render'> &
  Pick<HeadingRootProps, 'align' | 'size' | 'variant'> & {
    className?: FieldsetLegendProps['className'];
    render?: FieldsetLegendProps['render'];
  };

export function Legend({
  className,
  render,
  align,
  variant = 'title',
  size = 'large',
  ...props
}: LegendProps) {
  return (
    <Fieldset.Legend
      {...props}
      render={(legendProps, state) => {
        const { children, ...headingProps } = legendProps;

        return (
          <Heading.Root
            {...headingProps}
            align={align}
            variant={variant}
            size={size}
            className={mergeClassName(
              legendClassName,
              resolveStateClassName(className, state),
            )}
            render={resolveStateRender(render, state) ?? <div />}
          >
            {children}
          </Heading.Root>
        );
      }}
    />
  );
}
