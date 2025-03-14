import { getProp } from '@kalink-ui/dibbly';
import { PathsOf, PolymorphicComponentProps } from '@kalink-ui/dibbly/types';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { typography as typographyVariants } from '../../styles/typography.css';
import { Box } from '../box';

import { textRecipe, type TextVariants } from './text.css';

type TextProps<TUse extends React.ElementType> =
  PolymorphicComponentProps<TUse> & {
    /**
     * The typography used to render the text.
     */
    typography?: PathsOf<typeof typographyVariants>;
    /**
     * If true, use an ellipsis when the text overflows the element.
     */
    ellipsis?: TextVariants['ellipsis'];
  };

export function Text<TUse extends ElementType>({
  className,
  typography,
  ellipsis,
  ...props
}: TextProps<TUse>) {
  const { use = 'span', ...rest } = props;

  return (
    <Box
      // See `frontend/components/box/box.types.ts` for why the cast is required
      use={use as TextProps<TUse>['use']}
      className={clsx(
        textRecipe({ ellipsis }),
        typography && getProp(typographyVariants, typography),
        className,
      )}
      {...rest}
    />
  );
}
