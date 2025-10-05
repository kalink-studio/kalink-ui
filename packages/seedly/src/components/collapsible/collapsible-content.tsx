'use client';

import { CollapsibleContentProps, Content } from '@radix-ui/react-collapsible';
import { clsx } from 'clsx';

import { collapsibleContent } from './collapsible-content.css';

export function CollapsibleContent({
  className,
  ...props
}: CollapsibleContentProps) {
  return <Content className={clsx(collapsibleContent, className)} {...props} />;
}
