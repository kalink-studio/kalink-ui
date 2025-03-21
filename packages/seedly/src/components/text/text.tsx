import {
  DistributiveOmit,
  PolymorphicComponentProps,
  getProp,
} from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { TypographySize, TypographyVariant, typography } from '../../styles';

import { TextVariants, textRecipe, textEllipsisWrapper } from './text.css';

export type TextProps<TUse extends React.ElementType> = DistributiveOmit<
  PolymorphicComponentProps<TUse>,
  'children'
> &
  TextVariants & {
    /**
     * The size of the typography used to render the text.
     */
    size?: TypographySize;

    /**
     * The typography variant used to render the text.
     */
    variant?: Extract<TypographyVariant, 'body' | 'caption' | 'label'>;

    /**
     * The text to render.
     */
    children: string;
  };

export function Text<TUse extends ElementType>(props: TextProps<TUse>) {
  const {
    children,
    className,
    ellipsis,
    size = 'medium',
    use: Comp = 'span',
    variant = 'body',
    ...rest
  } = props;

  return (
    <Comp
      className={clsx(
        textRecipe({ ellipsis }),
        getProp(typography, `${variant}.${size}`),
        className,
      )}
      {...rest}
    >
      {ellipsis ? (
        <span className={textEllipsisWrapper}>{children}</span>
      ) : (
        children
      )}
    </Comp>
  );
}
