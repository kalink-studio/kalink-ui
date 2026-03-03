import { Heading, type HeadingLevel } from '@kalink-ui/seedly-react';
import { clsx } from 'clsx';

import type { AnchorFields } from '@/types/cms';
import { getAnchorId } from '@/utils/get-anchor-id';

export interface BlockHeadingProps {
  title: string;
  anchor: AnchorFields;
  as?: HeadingLevel;
  className?: string;
}

export function BlockHeading({
  title,
  anchor,
  as,
  className,
}: BlockHeadingProps) {
  const id = getAnchorId(anchor, title);

  return (
    <Heading.Root
      level={as ?? 'h2'}
      wrap="balance"
      className={clsx(className)}
      {...(id ? { id } : {})}
    >
      {title}
    </Heading.Root>
  );
}
