import { trigger as triggerClassName } from '@kalink-ui/seedly/components/navigation-menu';

import { Button, ButtonRootProps } from '../button';
import { mergeClassName } from '@/utils/merge-class-name';

export interface TriggerLinkProps extends ButtonRootProps {
  href: string;
}

export function TriggerLink({
  className,
  size = 'lg',
  variant = 'ghost',
  tone = 'neutral',
  nativeButton = false,
  ...props
}: TriggerLinkProps) {
  return (
    <Button
      {...props}
      nativeButton={nativeButton}
      tone={tone}
      variant={variant}
      size={size}
      className={mergeClassName(triggerClassName, className)}
      render={<a />}
    />
  );
}
