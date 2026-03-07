import { Combobox, type ComboboxTriggerProps } from '@base-ui/react/combobox';
import { trigger as triggerClassName } from '@kalink-ui/seedly/components/combobox';

import { mergeClassName } from '../../utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '../../utils/resolve-state-props';
import { Button, type ButtonCompositionProps } from '../button';

type TriggerProps = Omit<
  ComboboxTriggerProps,
  'children' | 'className' | 'render'
> &
  Omit<ButtonCompositionProps, 'icon'> & {
    icon: NonNullable<ButtonCompositionProps['icon']>;
    'aria-label': string;
    children?: never;
    className?: ComboboxTriggerProps['className'];
    render?: ComboboxTriggerProps['render'];
  };

export function Trigger({
  className,
  render,
  children: _children,
  unstyled,
  variant = 'ghost',
  tone = 'neutral',
  size = 'sm',
  shape,
  flow,
  loading,
  icon,
  ...props
}: TriggerProps) {
  return (
    <Combobox.Trigger
      {...props}
      render={(triggerProps, state) => {
        const { children: _triggerChildren, ...resolvedTriggerProps } =
          triggerProps;
        const resolvedClassName = resolveStateClassName(className, state);

        return (
          <Button
            {...resolvedTriggerProps}
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
