import { Stack, StackProps } from '../stack';

export type AlertDialogHeaderProps = StackProps<'div'>;

export const AlertDialogHeader = ({
  className,
  spacing = 2,
  ...props
}: AlertDialogHeaderProps) => {
  return <Stack spacing={spacing} {...props} />;
};
