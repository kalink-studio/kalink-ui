import { pretitleResponsive } from '@kalink-ui/seedly/components/heading';

import { Text } from '@/components/text';

import type { HeadingPretitleProps } from './root';

export function Pretitle({
  variant = 'title',
  size = 'medium',
  spacing,
  children,
  className,
  ...props
}: HeadingPretitleProps) {
  if (children == null || children === '') {
    return null;
  }

  return (
    <Text
      {...props}
      render={<p />}
      variant={variant}
      size={size}
      className={pretitleResponsive({ spacing }, className)}
    >
      {children}
    </Text>
  );
}
