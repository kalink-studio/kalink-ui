import { PolymorphicComponentProps, getProp } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { TypographySize, TypographyVariant, typography } from '../../styles';

import { TextVariants, textRecipe, textEllipsisWrapper } from './text.css';

export type TextProps<TUse extends React.ElementType> =
  PolymorphicComponentProps<TUse> &
    TextVariants & {
      /**
       * The size of the typography used to render the text.
       */
      size?: TypographySize;

      /**
       * The typography variant used to render the text.
       */
      variant?: TypographyVariant;
    };

export function Text<TUse extends ElementType>(props: TextProps<TUse>) {
  const {
    children,
    className,
    truncate,
    lineClamp,
    size = 'medium',
    use: Comp = 'span',
    variant = 'body',
    wrap,
    align,
    ...rest
  } = props;

  return (
    <Comp
      className={clsx(
        getProp(typography, `${variant}.${size}`),
        textRecipe({ truncate, lineClamp, align, wrap }),
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
