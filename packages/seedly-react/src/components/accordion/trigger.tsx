import {
  Accordion,
  type AccordionTriggerProps,
} from '@base-ui/react/accordion';
import { trigger as triggerClassName } from '@kalink-ui/seedly/components/accordion';

import { mergeClassName } from '../../utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '../../utils/resolve-state-props';
import { Button, type ButtonCompositionProps } from '../button';

type TriggerProps = Omit<AccordionTriggerProps, 'className' | 'render'> &
  ButtonCompositionProps & {
    className?: AccordionTriggerProps['className'];
    render?: AccordionTriggerProps['render'];
  };

export function Trigger({
  className,
  render,
  unstyled,
  variant = 'bare',
  tone = 'neutral',
  size = 'lg',
  shape = 'none',
  flow,
  loading,
  icon,
  ...props
}: TriggerProps) {
  return (
    <Accordion.Trigger
      {...props}
      render={(triggerProps, state) => {
        const resolvedClassName = resolveStateClassName(className, state);

        return (
          <Button
            {...triggerProps}
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
                : mergeClassName(triggerClassName, resolvedClassName)
            }
            render={resolveStateRender(render, state)}
          />
        );
      }}
    />
  );
}
