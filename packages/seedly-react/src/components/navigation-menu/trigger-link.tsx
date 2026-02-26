import { trigger as triggerClassName } from '@kalink-ui/seedly/components/navigation-menu';

import { mergeClassName } from '@/utils/merge-class-name';

import { Link, type LinkProps } from './link';

export function TriggerLink({ className, size = 'lg', ...props }: LinkProps) {
  return (
    <Link
      {...props}
      size={size}
      className={mergeClassName(triggerClassName, className)}
    />
  );
}
