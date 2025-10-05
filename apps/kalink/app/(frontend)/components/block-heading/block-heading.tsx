import { Heading, type HeadingTypes } from '@kalink-ui/seedly';
import { clsx } from 'clsx';

import type { AnchorFields } from '@/types/cms';
import { getAnchorId } from '@/utils/get-anchor-id';

export interface BlockHeadingProps {
  title: string;
  anchor: AnchorFields;
  as?: HeadingTypes;
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
    <Heading
      use={as ?? 'h2'}
      wrap="balance"
      className={clsx(className)}
      {...(id ? { id } : {})}
    >
      {title}
    </Heading>
  );
}
