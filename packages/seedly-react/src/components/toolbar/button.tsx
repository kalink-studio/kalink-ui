import { Toolbar, type ToolbarButtonProps } from '@base-ui/react/toolbar';
import { button as buttonClassName } from '@kalink-ui/seedly/components/toolbar';

import { Button as ButtonRoot, type ButtonCompositionProps } from '../button';
import { mergeClassName } from '@/utils/merge-class-name';
import {
  resolveStateClassName,
  resolveStateRender,
} from '@/utils/resolve-state-props';

type ButtonProps = Omit<ToolbarButtonProps, 'className' | 'render'> &
  ButtonCompositionProps & {
    className?: ToolbarButtonProps['className'];
    render?: ToolbarButtonProps['render'];
  };

export function Button({
  className,
  render,
  unstyled,
  variant = 'bare',
  tone = 'neutral',
  size = 'md',
  shape,
  flow,
  loading,
  icon,
  ...props
}: ButtonProps) {
  const hasCustomRender = render != null;

  return (
    <Toolbar.Button
      {...props}
      render={(toolbarButtonProps, state) => {
        const shouldUseChildStyles = unstyled === true || hasCustomRender;
        const resolvedClassName = resolveStateClassName(className, state);

        return (
          <ButtonRoot
            {...toolbarButtonProps}
            unstyled={shouldUseChildStyles}
            variant={variant}
            tone={tone}
            size={size}
            shape={shape}
            flow={flow}
            loading={loading}
            icon={icon}
            className={
              shouldUseChildStyles
                ? resolvedClassName
                : mergeClassName(buttonClassName, resolvedClassName)
            }
            render={resolveStateRender(render, state)}
          />
        );
      }}
    />
  );
}
