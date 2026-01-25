import { PolymorphicComponentProps, getProp } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import {
  TypographySize,
  TypographyVariant,
  buildTypographyOverrides,
  getResponsiveBase,
  typography,
  type Responsive,
} from '../../styles';

import { TextVariants, textEllipsisWrapper } from './text.css';
import { textResponsive } from './text.responsive';

export type TextProps<TUse extends React.ElementType> =
  PolymorphicComponentProps<TUse> &
    Omit<TextVariants, 'align'> & {
      /**
       * The size of the typography used to render the text.
       */
      size?: Responsive<TypographySize>;

      /**
       * The typography variant used to render the text.
       */
      variant?: Responsive<TypographyVariant>;
      align?: Responsive<NonNullable<TextVariants['align']>>;
    };

export function Text<TUse extends ElementType>(props: TextProps<TUse>) {
  const {
    children,
    className,
    truncate,
    lineClamp,
    size,
    use: Comp = 'span',
    variant,
    wrap,
    align,
    ...rest
  } = props;

  const typographyOverrides = buildTypographyOverrides({ variant, size });
  const baseVariant = getResponsiveBase(variant) ?? 'body';
  const baseSize = getResponsiveBase(size) ?? 'medium';

  return (
    <Comp
      className={clsx(
        getProp(typography, `${baseVariant}.${baseSize}`),
        typographyOverrides,
        textResponsive({ truncate, lineClamp, align, wrap }),
        className,
      )}
      {...rest}
    >
      {truncate ? (
        <span className={textEllipsisWrapper}>{children}</span>
      ) : (
        children
      )}
    </Comp>
  );
}
