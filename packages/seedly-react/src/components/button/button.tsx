import {
  Button as BaseButton,
  type ButtonProps as BaseButtonProps,
} from '@base-ui/react/button';
import {
  buttonIcon,
  buttonLabel,
  buttonResponsive,
  type ResponsiveButtonVariants,
} from '@kalink-ui/seedly/components/button';

import { mergeClassName } from '../../utils/merge-class-name';

import type { ReactNode } from 'react';

type ButtonIcon = Exclude<ReactNode, null | undefined | false>;

export interface ButtonVariantProps {
  /**
   * Renders the raw Base UI button without Seedly styles.
   */
  unstyled?: boolean;

  /**
   * Visual treatment of the button.
   */
  variant?: ResponsiveButtonVariants['variant'];

  /**
   * Button size. Adjusts padding and font size accordingly.
   */
  size?: ResponsiveButtonVariants['size'];

  /**
   * Content flow direction for icon and label.
   */
  flow?: ResponsiveButtonVariants['flow'];

  /**
   * Corner shape token applied to the button.
   */
  shape?: ResponsiveButtonVariants['shape'];

  /**
   * Semantic tone applied to button colors.
   */
  tone?: ResponsiveButtonVariants['tone'];

  /**
   * Shows spinner and applies loading interaction state.
   */
  loading?: ResponsiveButtonVariants['loading'];
}

export interface ButtonCompositionProps extends ButtonVariantProps {
  /**
   * Icon to display in the button.
   */
  icon?: ButtonIcon;
}

export interface ButtonRootProps
  extends BaseButtonProps, ButtonCompositionProps {
  children?: ReactNode;
}

export function Button({
  className,
  unstyled,
  variant,
  tone,
  size,
  shape,
  flow,
  loading,
  disabled,
  icon,
  children,
  focusableWhenDisabled,
  ...props
}: ButtonRootProps) {
  const shouldWrapLabel =
    unstyled !== true &&
    (typeof children === 'string' || typeof children === 'number');

  return (
    <BaseButton
      {...props}
      disabled={disabled === true || loading}
      focusableWhenDisabled={
        typeof focusableWhenDisabled === 'boolean'
          ? focusableWhenDisabled
          : loading
      }
      data-loading={loading ? '' : undefined}
      aria-busy={loading || undefined}
      className={
        unstyled
          ? className
          : mergeClassName(
              buttonResponsive({
                variant,
                tone,
                size,
                shape,
                flow,
                iconOnly: icon != null && children == null,
                loading,
              }),
              className,
            )
      }
    >
      {icon && (
        <span aria-hidden className={unstyled ? undefined : buttonIcon}>
          {icon}
        </span>
      )}

      {children != null &&
        (shouldWrapLabel ? (
          <span className={buttonLabel}>{children}</span>
        ) : (
          children
        ))}

      {loading && <span aria-hidden />}
    </BaseButton>
  );
}
