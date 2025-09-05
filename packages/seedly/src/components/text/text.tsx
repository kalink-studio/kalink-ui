import { PolymorphicComponentProps, getProp } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { TypographySize, TypographyVariant, typography } from '../../styles';

import { TextVariants, textEllipsisWrapper } from './text.css';
import { buildTypographyOverrides, textResponsive } from './text.responsive';

import type { Responsive } from '../../styles/responsive';

function getBase<T extends string | number>(value: Responsive<T> | undefined) {
  if (value == null) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value[0] ?? undefined;
  }

  if (typeof value === 'object') {
    const obj = value as Partial<Record<string, T>> & { xs?: T };

    return obj.xs;
  }

  return value;
}

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
  const baseVariant = getBase(variant) ?? 'body';
  const baseSize = getBase(size) ?? 'medium';

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
