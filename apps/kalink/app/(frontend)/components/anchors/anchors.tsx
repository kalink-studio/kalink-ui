import Link from 'next/link';

import type { BlockAnchor } from '@/utils/get-block-anchors';

import { anchorLink, anchorsContainer } from './anchors.css';

interface AnchorsProps {
  anchors: BlockAnchor[];
}

export function Anchors({ anchors }: AnchorsProps) {
  if (!anchors.length) {
    return null;
  }

  return (
    <nav aria-label="Navigation de section" className={anchorsContainer}>
      {anchors.map((anchor) => (
        <Link key={anchor.id} href={`#${anchor.slug}`} className={anchorLink}>
          {anchor.label}
        </Link>
      ))}
    </nav>
  );
}
