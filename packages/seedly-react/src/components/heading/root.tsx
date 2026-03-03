import { headingRootResponsive } from '@kalink-ui/seedly/components/heading';
import { type TextVariants } from '@kalink-ui/seedly/components/text';
import {
  type Responsive,
  type Spacing,
  type TypographySize,
  type TypographyVariant,
} from '@kalink-ui/seedly/styles';

import { Text, type TextProps } from '@/components/text';

import type { ReactElement, ReactNode } from 'react';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingVariant = Extract<
  TypographyVariant,
  'display' | 'headline' | 'title'
>;

export interface HeadingPretitleProps extends Omit<TextProps, 'children'> {
  children?: string | null;
  spacing?: Responsive<Spacing>;
}

export interface HeadingSubtitleProps extends Omit<TextProps, 'children'> {
  children?: string | null;
  spacing?: Responsive<Spacing>;
}

export interface RootProps extends Omit<
  TextProps,
  'align' | 'render' | 'size' | 'variant'
> {
  level?: HeadingLevel;
  variant?: Responsive<HeadingVariant>;
  size?: Responsive<TypographySize>;
  align?: Responsive<NonNullable<TextVariants['align']>>;
  pretitle?: ReactElement<HeadingPretitleProps>;
  subtitle?: ReactElement<HeadingSubtitleProps>;
  rootClassName?: string;
  children: ReactNode;
  render?: TextProps['render'];
}

const headingMapping: Record<
  HeadingLevel,
  { variant: TypographyVariant; size: TypographySize }
> = {
  h1: { variant: 'display', size: 'large' },
  h2: { variant: 'display', size: 'medium' },
  h3: { variant: 'display', size: 'small' },
  h4: { variant: 'headline', size: 'large' },
  h5: { variant: 'headline', size: 'medium' },
  h6: { variant: 'headline', size: 'small' },
};

export function Root({
  children,
  level = 'h2',
  size,
  variant,
  align,
  pretitle,
  subtitle,
  rootClassName,
  render,
  ...props
}: RootProps) {
  const HeadingTag = level;
  const headingRender = render ?? <HeadingTag />;

  const title = (
    <Text
      {...props}
      render={headingRender}
      align={align}
      variant={variant ?? headingMapping[level].variant}
      size={size ?? headingMapping[level].size}
    >
      {children}
    </Text>
  );

  if (pretitle == null && subtitle == null) {
    return title;
  }

  return (
    <hgroup className={headingRootResponsive({ align }, rootClassName)}>
      {pretitle}
      {title}
      {subtitle}
    </hgroup>
  );
}
