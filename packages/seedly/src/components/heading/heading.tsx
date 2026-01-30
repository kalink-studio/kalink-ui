import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { ElementType, ReactElement, ReactNode } from 'react';

import { Spacing, TypographySize, TypographyVariant } from '../../styles';
import { ConditionalWrapper } from '../conditional-wrapper';
import { Text, TextProps, TextVariants } from '../text';

import {
  headingRootResponsive,
  pretitleResponsive,
  subtitleResponsive,
} from './heading.responsive';

import type { Responsive } from '../../styles/responsive';

export type HeadingTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps<TUse extends ElementType = 'h2'> =
  PolymorphicComponentProps<TUse> &
    Omit<TextVariants, 'align'> & {
      /**
       * The typography used to render the text.
       */
      variant?: Responsive<
        Extract<TypographyVariant, 'display' | 'headline' | 'title'>
      >;

      /**
       * The size of the typography used to render the text.
       */
      size?: Responsive<TypographySize>;

      /**
       * If provided, the text will be rendered before the title.
       */
      pretitle?: ReactElement<TextProps<'p'>>;

      /**
       * If provided, the text will be rendered after the title.
       */
      subtitle?: ReactElement<TextProps<'p'>>;

      /**
       * The text to render.
       */
      children: ReactNode;

      /**
       * The class to pass to the root element.
       */
      rootClassName?: string;
      align?: Responsive<NonNullable<TextVariants['align']>>;
    };

const headingMapping: Record<
  HeadingTypes,
  { variant: TypographyVariant; size: TypographySize }
> = {
  h1: { variant: 'display', size: 'large' },
  h2: { variant: 'display', size: 'medium' },
  h3: { variant: 'display', size: 'small' },
  h4: { variant: 'headline', size: 'large' },
  h5: { variant: 'headline', size: 'medium' },
  h6: { variant: 'headline', size: 'small' },
};

export function Heading<TUse extends HeadingTypes>(props: HeadingProps<TUse>) {
  const {
    children,
    use = 'h2',
    size,
    variant,
    align,
    pretitle,
    subtitle,
    rootClassName,
    ref,
    ...rest
  } = props;

  return (
    <ConditionalWrapper
      ref={ref}
      use={'hgroup'}
      condition={!!pretitle || !!subtitle}
      className={headingRootResponsive({ align }, rootClassName)}
    >
      {pretitle}

      <Text
        {...(!pretitle && !subtitle && { ref })}
        use={use as HeadingProps<TUse>['use']}
        align={align}
        variant={variant ?? headingMapping[use].variant}
        size={size ?? headingMapping[use].size}
        {...rest}
      >
        {children}
      </Text>

      {subtitle}
    </ConditionalWrapper>
  );
}

export type HeadingPretitleProps = Omit<TextProps<'p'>, 'children'> & {
  children?: string | null;
  spacing?: Responsive<Spacing>;
};

Heading.Pretitle = function HeadingPretitle({
  variant = 'title',
  size = 'medium',
  spacing,
  children,
  className,
  ...rest
}: HeadingPretitleProps) {
  return (
    children && (
      <Text
        use="p"
        variant={variant}
        size={size}
        className={pretitleResponsive({ spacing }, className)}
        {...rest}
      >
        {children}
      </Text>
    )
  );
};

export type HeadingSubtitleProps = Omit<TextProps<'p'>, 'children'> & {
  children?: string | null;
  spacing?: Responsive<Spacing>;
};

Heading.Subtitle = function HeadingSubtitle({
  variant = 'title',
  size = 'medium',
  spacing,
  children,
  className,
  ...rest
}: HeadingSubtitleProps) {
  return (
    children && (
      <Text
        use="p"
        variant={variant}
        size={size}
        className={subtitleResponsive({ spacing }, className)}
        {...rest}
      >
        {children}
      </Text>
    )
  );
};
