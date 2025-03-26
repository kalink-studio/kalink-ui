import { clsx } from 'clsx';
import { ElementType, ReactElement } from 'react';

import { Spacing, TypographySize, TypographyVariant } from '../../styles';
import { ConditionalWrapper } from '../conditional-wrapper';
import { Text, TextProps } from '../text';

import { headingRoot } from './heading.css';

export type HeadingTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps<TUse extends ElementType = 'h2'> = Omit<
  TextProps<TUse>,
  'variant' | 'children'
> & {
  /**
   * The typography used to render the text.
   */
  variant: Extract<TypographyVariant, 'display' | 'headline' | 'title'>;

  /**
   * If provided, the text will be rendered before the title.
   */
  pretitle?: ReactElement<TextProps<'p'>>;

  /**
   * If provided, the text will be rendered after the title.
   */
  subtitle?: ReactElement<TextProps<'p'>>;

  /**
   * The spacing between the title and the pretitle or subtitle.
   */
  spacing?: Spacing;

  /**
   * The text to render.
   */
  children: string;
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

export function Heading<TUse extends HeadingTypes>({
  children,
  use = 'h2',
  size,
  variant,
  align,
  spacing,
  pretitle,
  subtitle,
  ...rest
}: HeadingProps<TUse>) {
  return (
    <ConditionalWrapper
      use={'hgroup'}
      condition={!!pretitle || !!subtitle}
      className={clsx(headingRoot({ align, spacing }))}
    >
      {pretitle}

      <Text
        use={use}
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

Heading.Pretitle = function HeadingPretitle({
  variant = 'title',
  size = 'medium',
  ...rest
}: TextProps<'p'>) {
  return <Text use="p" variant={variant} size={size} {...rest} />;
};

Heading.Subtitle = function HeadingSubtitle({
  variant = 'title',
  size = 'medium',
  ...rest
}: TextProps<'p'>) {
  return <Text use="p" variant={variant} size={size} {...rest} />;
};
