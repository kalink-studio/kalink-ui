import { Tabs, type TabsTabProps } from '@base-ui/react/tabs';
import { tab as tabClassName } from '@kalink-ui/seedly/components/tabs';

import { mergeClassName } from '../../utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '../../utils/resolve-state-props';
import { Button, type ButtonCompositionProps } from '../button';

type TabProps = Omit<TabsTabProps, 'className' | 'render'> &
  ButtonCompositionProps & {
    className?: TabsTabProps['className'];
    render?: TabsTabProps['render'];
  };

export function Tab({
  className,
  render,
  unstyled,
  variant = 'ghost',
  tone = 'neutral',
  size = 'md',
  shape,
  flow,
  loading,
  icon,
  ...props
}: TabProps) {
  return (
    <Tabs.Tab
      {...props}
      render={(tabProps, state) => {
        const resolvedClassName = resolveStateClassName(className, state);

        return (
          <Button
            {...tabProps}
            unstyled={unstyled}
            variant={variant}
            tone={tone}
            size={size}
            shape={shape}
            flow={flow}
            loading={loading}
            icon={icon}
            className={
              unstyled
                ? resolvedClassName
                : mergeClassName(tabClassName, resolvedClassName)
            }
            render={resolveStateRender(render, state)}
          />
        );
      }}
    />
  );
}
