import { Container } from '@/components/container';
import type { ContainerProps } from '@/components/container/container';

export type SolidShellProps = Omit<
  ContainerProps,
  'variant' | 'level' | 'corner' | 'spacing'
>;

export function SolidShell(props: SolidShellProps) {
  return (
    <Container
      variant="solid"
      level="base"
      corner="medium"
      spacing={2}
      {...props}
    />
  );
}
