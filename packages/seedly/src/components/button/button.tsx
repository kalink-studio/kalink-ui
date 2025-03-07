import { clsx } from 'clsx';

import { Box } from '@/components/box';
import type { PolymorphicComponentProps } from '@/types/utils.types';

import { buttonRecipe, type ButtonVariants } from './button.css';

type ButtonProps<TUse extends React.ElementType> =
  PolymorphicComponentProps<TUse> & {
    /**
     * The main variation of the button
     */
    variant?: ButtonVariants['variant'];
  };

export const Button = <TUse extends React.ElementType = 'button'>({
  children,
  className,
  variant,
  ...props
}: ButtonProps<TUse>) => {
  const { use: Comp = 'button', ...rest } = props;

  return (
    <Comp
      use={Box}
      className={clsx(buttonRecipe({ variant }), className)}
      {...rest}
    >
      {children}
    </Comp>
  );
};
