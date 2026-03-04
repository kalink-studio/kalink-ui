import { Accordion, type AccordionPanelProps } from '@base-ui/react/accordion';
import { panel as panelClassName } from '@kalink-ui/seedly/components/accordion';

import { Text, type TextProps } from '../text';
import { mergeClassName } from '@/utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '@/utils/resolve-state-props';

type PanelProps = Omit<AccordionPanelProps, 'className' | 'render'> &
  Pick<
    TextProps,
    'align' | 'lineClamp' | 'size' | 'truncate' | 'variant' | 'wrap'
  > & {
    className?: AccordionPanelProps['className'];
    render?: AccordionPanelProps['render'];
  };

export function Panel({
  className,
  render,
  align,
  lineClamp,
  truncate,
  wrap,
  variant = 'body',
  size = 'medium',
  ...props
}: PanelProps) {
  return (
    <Accordion.Panel
      {...props}
      render={(panelProps, state) => (
        <Text
          {...panelProps}
          align={align}
          lineClamp={lineClamp}
          truncate={truncate}
          wrap={wrap}
          variant={variant}
          size={size}
          className={mergeClassName(
            panelClassName,
            resolveStateClassName(className, state),
          )}
          render={resolveStateRender(render, state) ?? <div />}
        />
      )}
    />
  );
}
