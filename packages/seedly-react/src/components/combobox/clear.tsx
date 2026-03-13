import { Combobox, type ComboboxClearProps } from '@base-ui/react/combobox';
import { clear as clearClassName } from '@kalink-ui/seedly/components/combobox';

import { mergeClassName } from '../../utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '../../utils/resolve-state-props';
import { Button, type ButtonCompositionProps } from '../button';

type ClearProps = Omit<
  ComboboxClearProps,
  'children' | 'className' | 'render'
> &
  Omit<ButtonCompositionProps, 'icon'> & {
    icon: NonNullable<ButtonCompositionProps['icon']>;
    'aria-label': string;
    children?: never;
    className?: ComboboxClearProps['className'];
    render?: ComboboxClearProps['render'];
  };

export function Clear({
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
}: ClearProps) {
  return (
    <Combobox.Clear
      {...props}
      render={(clearProps, state) => {
        const { children: _clearChildren, ...resolvedClearProps } = clearProps;
        const resolvedClassName = resolveStateClassName(className, state);

        return (
          <Button
            {...resolvedClearProps}
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
                : mergeClassName(clearClassName, resolvedClassName)
            }
            render={resolveStateRender(render, state)}
          />
        );
      }}
    />
  );
}
