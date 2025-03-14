import { clsx } from 'clsx';

import { Box } from '../box';

import { buttonRecipe, type ButtonVariants } from './button.css';

import type { PolymorphicComponentProps } from '@kalink-ui/dibbly/types';

type ButtonProps<TUse extends React.ElementType> =
  PolymorphicComponentProps<TUse> & {
    /**
     * The main variation of the button
     */
    variant?: ButtonVariants['variant'];
  };

export const Button = <TUse extends React.ElementType = 'button'>({
  className,
  variant,
  ...props
}: ButtonProps<TUse>) => {
  const { use: Comp = 'button', ...rest } = props;

  return (
    <Box
      use={Comp}
      className={clsx(buttonRecipe({ variant }), className)}
      {...rest}
    />
  );
};
