import { subtitleResponsive } from '@kalink-ui/seedly/components/heading';

import { Text } from '@/components/text';

import type { HeadingSubtitleProps } from './root';

export function Subtitle({
  variant = 'title',
  size = 'medium',
  spacing,
  children,
  className,
  ...props
}: HeadingSubtitleProps) {
  if (children == null || children === '') {
    return null;
  }

  return (
    <Text
      {...props}
      render={<p />}
      variant={variant}
      size={size}
      className={subtitleResponsive({ spacing }, className)}
    >
      {children}
    </Text>
  );
}
