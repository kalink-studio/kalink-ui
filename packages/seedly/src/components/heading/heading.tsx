import { getProp, PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';

import {
  typography,
  Spacing,
  TypographySize,
  TypographyVariant,
} from '../../styles';
import { ConditionalWrapper } from '../conditional-wrapper';
import { Stack } from '../stack';

import { headingRecipe } from './heading.css';

type HeadingTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingProps<TUse extends HeadingTypes> =
  PolymorphicComponentProps<TUse> & {
    /**
     * The size of the typography used to render the text.
     */
    size?: TypographySize;

    /**
     * The typography used to render the text.
     */
    variant: Extract<TypographyVariant, 'display' | 'headline' | 'title'>;

    /**
     * The text to render.
     */
    children: string;

    /**
     * If provided, the text will be rendered before the title.
     */
    pretitle?: string;

    /**
     * If provided, the text will be rendered after the title.
     */
    subtitle?: string;

    /**
     * The spacing between the title and the pretitle or subtitle.
     */
    spacing?: Spacing;
  };

export function Heading<TUse extends HeadingTypes>(props: HeadingProps<TUse>) {
  const {
    children,
    className,
    size = 'medium',
    use: Comp = 'h1',
    variant,
    pretitle,
    subtitle,
    spacing,
    ...rest
  } = props;

  return (
    <ConditionalWrapper
      use={Stack}
      spacing={spacing}
      condition={!!pretitle || !!subtitle}
    >
      {pretitle && <span>{pretitle}</span>}
      <Comp
        className={clsx(
          headingRecipe(),
          getProp(typography, `${variant}.${size}`),
          className,
        )}
        {...rest}
      >
        {children}
      </Comp>
      {subtitle && <span>{subtitle}</span>}
    </ConditionalWrapper>
  );
}
