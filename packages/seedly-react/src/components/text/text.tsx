import { useRender } from '@base-ui/react/use-render';
import {
  textEllipsisWrapper,
  textResponsive,
  type TextVariants,
} from '@kalink-ui/seedly/components/text';
import {
  buildTypographyOverrides,
  getResponsiveBase,
  typography,
  type Responsive,
  type TypographySize,
  type TypographyVariant,
} from '@kalink-ui/seedly/styles';

import { mergeClassName } from '@/utils/merge-class-name';

export type TextProps = useRender.ComponentProps<'span'> &
  Omit<TextVariants, 'align' | 'lineClamp' | 'wrap'> & {
    size?: Responsive<TypographySize>;
    variant?: Responsive<TypographyVariant>;
    align?: Responsive<NonNullable<TextVariants['align']>>;
    wrap?: Responsive<NonNullable<TextVariants['wrap']>>;
    lineClamp?: Responsive<NonNullable<TextVariants['lineClamp']>>;
  };

export function Text({
  children,
  className,
  truncate,
  lineClamp,
  size,
  variant,
  wrap,
  align,
  render,
  ...props
}: TextProps) {
  const baseVariant = getResponsiveBase(variant) ?? 'body';
  const baseSize = getResponsiveBase(size) ?? 'medium';

  const classNameWithStyles = textResponsive(
    { truncate, lineClamp, align, wrap },
    typography[baseVariant][baseSize],
    ...buildTypographyOverrides({ variant, size }),
  );

  return useRender({
    render,
    defaultTagName: 'span',
    props: {
      ...props,
      className: mergeClassName(classNameWithStyles, className),
      children: truncate ? (
        <span className={textEllipsisWrapper}>{children}</span>
      ) : (
        children
      ),
    },
  });
}
