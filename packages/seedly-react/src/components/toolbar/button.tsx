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
  const shouldApplyToolbarStyles = unstyled !== true;
  const shouldUseButtonRootStyles = unstyled !== true && !hasCustomRender;

  return (
    <Toolbar.Button
      {...props}
      render={(toolbarButtonProps, state) => {
        const resolvedClassName = resolveStateClassName(className, state);

        return (
          <ButtonRoot
            {...toolbarButtonProps}
            unstyled={!shouldUseButtonRootStyles}
            variant={variant}
            tone={tone}
            size={size}
            shape={shape}
            flow={flow}
            loading={loading}
            icon={icon}
            className={
              shouldApplyToolbarStyles
                ? mergeClassName(buttonClassName, resolvedClassName)
                : resolvedClassName
            }
            render={resolveStateRender(render, state)}
          />
        );
      }}
    />
  );
}
