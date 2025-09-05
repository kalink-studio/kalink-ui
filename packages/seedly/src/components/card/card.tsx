import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { Box, Cluster, Stack } from '@kalink-ui/seedly';
import { Spacing } from '@kalink-ui/seedly/styles';

import { BoxProps } from '../box';
import { ClusterProps } from '../cluster';

import { card, cardBody, cardFooter, cardHeader } from './card.css';

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
    variant = 'solid',
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
      className={clsx(card, className)}
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

  return <Comp className={clsx(cardHeader, className)} {...rest} />;
};

Card.Body = function CardBody<TUse extends ElementType = 'div'>(
  props: PolymorphicComponentProps<TUse>,
) {
  const { use: Comp = 'div', className, ...rest } = props;

  return <Comp className={clsx(cardBody, className)} {...rest} />;
};

type CardFooterProps<TUse extends ElementType = 'footer'> = ClusterProps<TUse>;

Card.Footer = function CardFooter<TUse extends ElementType = 'footer'>(
  props: CardFooterProps<TUse>,
) {
  const { use = 'footer', className, ...rest } = props;

  return (
    <Cluster
      use={use as CardFooterProps['use']}
      className={clsx(cardFooter, className)}
      {...rest}
    />
  );
};
