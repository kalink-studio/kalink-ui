import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { Box, type BoxProps } from '../box';
import { Cluster, type ClusterProps } from '../cluster';
import { Stack } from '../stack';

import { cardFooterRecipe } from './card.css';

import type { Spacing } from '../../styles';
import type { Responsive } from '../../styles/responsive';

export type CardRootElement = 'article' | 'div';

export type CardProps<TUse extends CardRootElement = 'article'> =
  BoxProps<TUse> & {
    verticalSpacing?: Responsive<Spacing>;
  };

export function Card<TUse extends CardRootElement = 'article'>(
  props: CardProps<TUse>,
) {
  const {
    use = 'article',
    variant,
    className,
    spacing = 4,
    verticalSpacing,
    children,
    ...rest
  } = props;

  return (
    <Box
      use={use as CardProps['use']}
      variant={variant}
      spacing={spacing}
      className={className}
      {...rest}
    >
      <Stack align="stretch" spacing={verticalSpacing ?? spacing}>
        {children}
      </Stack>
    </Box>
  );
}

Card.Header = function CardHeader<TUse extends ElementType = 'header'>(
  props: PolymorphicComponentProps<TUse>,
) {
  const { use: Comp = 'header', className, ...rest } = props;

  return <Comp className={className} {...rest} />;
};

Card.Body = function CardBody<TUse extends ElementType = 'div'>(
  props: PolymorphicComponentProps<TUse>,
) {
  const { use: Comp = 'div', className, ...rest } = props;

  return <Comp className={className} {...rest} />;
};

type CardFooterProps<TUse extends ElementType = 'footer'> = ClusterProps<TUse>;

Card.Footer = function CardFooter<TUse extends ElementType = 'footer'>(
  props: CardFooterProps<TUse>,
) {
  const { use = 'footer', spacing = 2, className, ...rest } = props;

  return (
    <Cluster
      use={use as CardFooterProps['use']}
      className={clsx(cardFooterRecipe(), className)}
      spacing={spacing}
      {...rest}
    />
  );
};
